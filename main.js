// Load details from the authentication file.
var auth = require("./auth.js");

// Load other required modules.
var luxon = require("luxon");
var scheduler = require("node-schedule");
var twitter = require("twitter");
var client = twitter(auth);

// Coordinates of Old Joe.
var lat = 52.4498322;
var lon = -1.9306498;

// Returns a string with the correct number of bongs.
var getBong = function(hour) {
	var bongs = "";

	for (i = 0; i < hour; i++)
		bongs += "BONG ";

	return bongs;
};

var runBong = function() {
	var now = luxon.DateTime.local().setZone("Europe/London");
	var hour = (now.c.hour) % 12;

	// Hour 0 is hour 12.
	if (hour == 0)
		hour = 12;

	// Construct the tweet.
	var text = "[" + now.toFormat("dd/MM HH:00") + "]";
	text += " ";
	text += getBong(hour);
	text += "\uD83D\uDD14";

	// Send tweet to twitter.
	client.post("statuses/update", {
		// Text of the tweet.
		status: text,
		// Location of the tweet.
		lat: lat,
		long: lon
	}, function(e, tweet, res) {
		if (e) {
			console.log("Error tweeting \"" + text + "\"!");
			console.log(e);
		}else{
			console.log("Successfully tweeted!");
		}

		console.log("");
	});
};

// Schedule the runBong function to run every hour.
var job = scheduler.scheduleJob("0 * * * *", runBong);

console.log("Startup done, next tweet scheduled.");
