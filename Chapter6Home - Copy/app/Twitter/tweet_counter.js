var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};

counts.awesome = 0;
counts.cool = 0;
counts.rad = 0;
counts.gnarly = 0;
counts.groovy = 0;

// set up our twitter object
twitter = ntwitter(credentials);

// set up our twitter stream with three parameters,
// separated by commas
twitter = ntwitter(credentials);

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
				// increment the awesome counter
				counts.awesome = counts.awesome + 1;
			}
		});
	}
);

// print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;