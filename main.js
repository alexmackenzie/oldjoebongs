// Load details from the authentication file.
var auth = require("./auth.js");

// Load other required modules.
var time = require("time");
var scheduler = require("node-schedule");
var twitter = require("twitter");
var client = twitter(auth);

// Returns a string with the correct number of bongs.
var getBong = function(hour) {
	var bongs = "";

	for (i = 0; i < hour; i++)
		bongs += "BONG ";

	return bongs;
};

var runBong = function() {
	var now = new time.Date();
	now.setTimezone("Europe/London");

	var hour = now.getHours() % 12;

	// Hour 0 is hour 12.
	if (hour == 0)
		hour = 12;

	// Bong text.
	var text = getBong(hour).trim();

	client.post("statuses/update", {
		status: text
	}, function(e, tweet, res) {
		console.log("Tweeted!");
		console.log(text);
	});
};

// Schedule the runBong function to run every hour.
var job = scheduler.scheduleJob("0 * * * *", runBong);
