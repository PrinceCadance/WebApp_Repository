"use strict";

var main = function () {
	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];

	$(".tabs span").toArray().forEach(function (element) {
		// Create a click handler for this element
		$(element).on("click", function () {
			// since we're using the jquery version of element,
			// we'll go ahead and create a temporary variable
			// so we don't need to keep recreating it
			var $element = $(element),
				$content,
				$input,
				$button;

			$(".tabs span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length-1; i>=0; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
			} else if ($element.parent().is(":nth-child(3)")) {
				$input = $("<input>"),
				$button = $("<button>").text("+");

				$button.on("click", function() {
					if ($input.val() !== "") {
						toDos.push($input.val());
						$input.val("");
					}
				});
				$content = $("<div>").append($input).append($button);
			}
			$("main .content").append($content);

			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);