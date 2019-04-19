var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};
	counts.awesome = 0; 


	// set up twitter object
	twitter = ntwitter(credentials);

	twitter.stream("statuses/filter",
	{"track": ["awesome", "cool", "rad", "gnarly", "groovy"]},
	function(stream){
		stream.on("data", function(tweet) {
			if (tweet.text.indexOf("awesome") > -1)
			{
				counts.awesome = counts.awesome +1;
			}			
		});
	});

	setInterval(function(){
		console.log("awesome = " + counts.awesome);
	}, 3000);

	module.exports =  counts;