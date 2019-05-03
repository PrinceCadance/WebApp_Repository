"use strict";

var organizeByTags = function (toDoObjects) {
	// create empty tags array
	var tags = [];

	// iterate over all toDos
	toDoObjects.forEach(function (toDo) {
		// iterate over each tag in this Todo
		toDo.tags.forEach(function (tag) {
			// make sure the tag is not already in the tag array
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});

	var tagObjects = tags.map(function (tag) {
		// here we find all the to-do objects
		// that contain that tag 
		var toDosWithTag = [];
		toDoObjects.forEach(function (toDo) {
			// check to make sure the result of 
			// of indexOf is *not* equal to -1
			if (toDo.tags.indexOf(tag) !== -1) {
				toDosWithTag.push(toDo.description)
			}
		});
		return { "name": tag, "toDos": toDosWithTag};
	});
	return tagObjects;
};


var main = function (toDoObjects) {
	var toDos = toDoObjects.map(function (toDo) {
		// we'll just return the description of this toDoObject
		return toDo.description;
	});

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
				// This is the tags tab code
				var organizedByTag = organizeByTags(toDoObjects);
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");

					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Description: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Tags: "),
					$button = $("<button>").text("+");

				$button.on("click", function () {
					var description = $input.val(),
						tags = $tagInput.val().split(","); // split on commas
						toDoObjects.push({"description" : description, "tags" : tags});
						// update toDos
						toDos = toDoObjects.map(function (toDo) {
							return toDo.Description;
						});
						$input.val("");
						$tagInput.val("");
				});
				$content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
			}
			$("main .content").append($content);

			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		// call main with the to-dos as an argument
		main(toDoObjects);
	});
});