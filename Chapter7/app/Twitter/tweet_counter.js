var ntwitter = require("ntwitter"),
    credentials = require("./credentials.json"),
    redis = require("redis"),
    redisClient, 
    twitter,
    counts = {};

    counts.awesome =  0;


twitter =  ntwitter(credentials);

redisClient = redis.createClient();

// Get the "awesome" entry in our database.
redisClient.get( "awesome", function( err, awesomeCount ) {
    // stuff can fail - check for errors
    if ( err != null )
    {
        console.warn("Error: " + err );
        return;
    }

    // Everything in a Redis DB is stored as a string - we want an int - so 
    // we need to conver it
    counts.awesome = parseInt( awesomeCount, 10) || 0;
    twitter.stream( "statuses/filter", 
                { "track": ["awesome", "cool", "rad", "gnarly", "groovy"] },
                function(stream) {
                    stream.on( "data", function(tweet) {
                        if ( tweet.text.indexOf("awesome") > -1 ) {
                            // Increment the count in the database
                            redisClient.incr("awesome");
                            counts.awesome = counts.awesome + 1;
                        }
                    });
                } );     
});

setInterval ( function() {
    console.log( "Awesome: " + counts.awesome);
}, 3000 );

module.exports = counts;