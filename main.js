// Load details from the authentication file.
var auth = require("./auth.js");

// Load other required modules.
var time = require("time")(Date);
var dateformat = require("dateformat");
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
	var now = new Date();
	now.setTimezone("Europe/London");

	var hour = now.getHours() % 12;

	// Hour 0 is hour 12.
	if (hour == 0)
		hour = 12;

	// Bong text.
	var text = getBong(hour).trim();
	text = "[" + dateformat(now, "dd/mm HHtt") + "]" + text;
	text += "\uD83D\uDD14";

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
