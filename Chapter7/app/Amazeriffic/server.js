var express = require("express"),
	http = require("http"),
 	// import the mongoose library
 	mongoose = require("mongoose"),
 	app = express();

app.use(express.static(__dirname + "/client"));
// Parse incoming JSON
app.use(express.urlencoded());


// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);
// now we listen for requests
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
	// don't forget to check for errors!
	res.json(toDos);
	});
});

app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description,
							"tags":req.body.tags});
 	newToDo.save(function (err, result) {
 		if (err !== null) {
 			console.log(err);
 			res.send("ERROR");
 		} else {
 			// our client expects *all* of the todo items to be returned,
 			// so we do an additional request to maintain compatibility
 			ToDo.find({}, function (err, result) {
 				if (err !== null) {
 					// the element did not get saved!
 					res.send("ERROR");
 				}
 				res.json(result);
 			});
 		}
 	});
});