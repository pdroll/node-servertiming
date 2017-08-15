var express = require("express");
var app = express();
var ServerTiming = require("../index");

app.get("/", function(req, res) {

	var timing = new ServerTiming();

	// start timer
	timing.startTimer("Database Query");

	// simulate long running database query
	setTimeout(function() {

		// stop timer
		timing.stopTimer("Database Query");

		// add external non timer metric in milliseconds
		timing.addMetric("Image Processing", 12365);

		var shortQueryTimer = timing.startTimer("Short Query");

		// simulate a shorter database query
		setTimeout(function() {

			shortQueryTimer.stop();

			res.header("Server-Timing", timing.generateHeader());
			return res.send({whatever: "you want"});
		}, 200);

	}, 1234);
});

app.listen(8888, function() {
	console.log("Listening on port 8888...");
});
