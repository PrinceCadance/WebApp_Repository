var main = function() {
	"use strict";
	
	var insertCountsIntoDom = function (counts) {
		// your DOM manipulation code here
		var myCount = $("<p>").html( "Wordcount is " + counts.awesome );
        $("main").append( myCount );
	};

	// checks the coutn value every 5 seconds,
	// and inserts the updated version into the DOM
	setInterval(function () {
		$.getJSON("counts.json", insertCountsIntoDom)
	}, 5000);
};

$(document).ready(main);