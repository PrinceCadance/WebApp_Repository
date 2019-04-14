"use strict";
var requestURLBase = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?&tags=";
var requestURL
var main = function (imageObjects) {
    
    var displayImage = function(imageIndex) {
        if (imageIndex === imageObjects.items.length) {
            imageIndex = 0;
        }
        var $image = $("<img>").hide();
        $("main .photos img").fadeOut();
        $("main .photos").empty();
        $image.attr("src", imageObjects.items[imageIndex].media.m);
        $("main .photos").append($image);
        $image.fadeIn();

        setTimeout(function () {
            imageIndex += 1;
            displayImage(imageIndex);
        }, 3000);
    };
    displayImage(0);
};

$(document).ready(function() {
    $("button").on("click", function() {
        if ($("input").val() !== "") {
            requestURL = requestURLBase + $("input").val();
            console.log($("input").val());
        } else {
            requestURL = requestURLBase + "dog";
        }
        console.log(requestURL);
        $.getJSON(requestURL, function (imageObjects) {
            console.log(imageObjects);
            main(imageObjects);
        });
    });
});





