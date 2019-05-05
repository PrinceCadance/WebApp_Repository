var ntwitter = require("ntwitter"),
	redis = require("redis"), // require the redis module
	credentials = require("./credentials.json"),
	redisClient,
	twitter,
	// declare a counts object to store the counts
	counts = {};

// set up our twitter object
twitter = ntwitter(credentials);

// create a client to connect to Redis
client = redis.createClient();

// the callback gets two arguments
client.get("awesome", function (err, awesomeCount) {
	// check to make sure there's no error
	if (err !== null) {
		console.log("ERROR: " + err);
		// exit the function
		return;
	}

	// initialize our counter to the integer version
	// of the value stored in Redis, or 0 if it's not 
	// set
	counts.awesome = parseInt(awesomeCount, 10) || 0;

	// set up our twitter stream with three parameters,
	// separated by commmas
	twitter.stream(
		// the first parameter is a string
		"statuses/filter",

		// second parameter, an object containing an array
		{ "track" : ["awesome", "cool", "rad", "gnarly", "groovy"] },

		// the third parameter is our callback for when the stream is created
		function(stream) {
			stream.on("data", function(tweet) {
				if (tweet.text.indexOf("awesome") > -1) {
					// increment the key on the client
					client.incr("awesome");
					counts.awesome = counts.awesome + 1;
				}
			});
		}
	);

});





// print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;