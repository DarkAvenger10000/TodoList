const express = require("express");
const bodyParser = require("body-parser");
var tasks = ["Buy food", "Cook food", "Eat food"];
let workTasks = [];

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    listTitle: day,
    newTasks: tasks
  });


});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newTasks: workTasks
  });
});


app.post("/", function(req, res) {
  let task = req.body.nextTask;

  if (req.body.list === "Work List") {
    workTasks.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }

});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen("3000", function() {
  console.log("server is running on port 3000");
});
