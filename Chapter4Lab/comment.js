"use strict";

$( function()  {
	var $commentInput = $(".comment-input input");

	function processCommentInput() {
		var $new_comment;
		

		$commentInput.focus();

		if ($commentInput.val() !== "") {
			$new_comment = $("<p>").text($commentInput.val());
			$(".comments").append($new_comment);
			$commentInput.val("");			
		}
	} // end processCommentInput

	$($commentInput).on("keypress", function(event) {
		if (event.keyCode === 13) {
			processCommentInput();
		}
	}); // Eend on Keypress

	$(".comment-input button").on("click", function(event) {
		 processCommentInput();				
	}); // End on click 
});