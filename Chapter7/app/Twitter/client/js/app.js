$(function() {
   
    var displayWordcount = function( wordCounts) {
        var myCount = $("<p>").html( "Wordcount is " + wordCounts.awesome );
        $("main").append( myCount );
    }

    setInterval( function() { 
       $.getJSON( "/counts.json", displayWordcount );
   }, 3000 );

});