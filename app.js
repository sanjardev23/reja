// Just console message to know app.js started
console.log("Web Serverni boshlash");

// Import Express package
// Express helps us build web server easier
const express = require("express");

// Create Express app object
// We use "app" to create routes like app.get() and app.post()
const app = express();

// Import MongoDB package
// Needed for ObjectId and MongoDB functions
const mongodb = require("mongodb");

// Get database connection from server.js
// server.js exports db(), we are importing it here
const db = require("./server").db();


// ====================================================
// MIDDLEWARE SECTION
// ====================================================

// This allows browser to access public folder files
// Example:
// public/browser.js
// public/style.css
//
// Without this:
// <script src="/browser.js"></script>
// would not work
app.use(express.static("public"));


// This allows Express to understand JSON data
//
// Example:
//
// axios.post("/create-item", {
//   reja: "Learn Python"
// })
//
// Browser sends JSON
// Express converts it into:
//
/*
req.body = {
  reja: "Learn Python"
}
*/
app.use(express.json());


// This reads normal HTML form data
//
// Example:
//
// <form method="POST">
// <input name="reja">
// </form>
//
// Without this req.body becomes undefined
app.use(express.urlencoded({ extended: true }));


// ====================================================
// EJS SETTINGS
// ====================================================

// Tell Express:
// my EJS files are inside "views" folder
//
// Example:
// views/reja.ejs
app.set("views", "views");


// Tell Express:
// use EJS as template engine
//
// So now this works:
//
/*
res.render("reja")
*/
app.set("view engine", "ejs");


// ====================================================
// ICON FUNCTION
// ====================================================

// This function checks text and returns icon class
//
// Example:
//
// getIcon("python")
// → returns python icon
//
// getIcon("react")
// → returns react icon
function getIcon(text) {

  // If text is empty use ""
  // Convert to lowercase
  // So Python and python become same
  const t = (text || "").toLowerCase();

  if (t.includes("javascript") || t.includes(" js"))
    return "fa-brands fa-js";

  if (t.includes("react"))
    return "fa-brands fa-react";

  if (t.includes("node"))
    return "fa-brands fa-node-js";

  if (t.includes("python"))
    return "fa-brands fa-python";

  if (
    t.includes("mongo") ||
    t.includes("database") ||
    t.includes("db")
  )
    return "fa-solid fa-database";

  if (
    t.includes("ai") ||
    t.includes("machine") ||
    t.includes("ml")
  )
    return "fa-solid fa-robot";

  if (
    t.includes("devops") ||
    t.includes("docker")
  )
    return "fa-brands fa-docker";

  if (t.includes("git"))
    return "fa-brands fa-github";

  if (
    t.includes("css") ||
    t.includes("frontend")
  )
    return "fa-brands fa-css3-alt";

  if (t.includes("html"))
    return "fa-brands fa-html5";

  if (
    t.includes("backend") ||
    t.includes("server") ||
    t.includes("api")
  )
    return "fa-solid fa-server";

  // Default icon if nothing matches
  return "fa-solid fa-circle-check";
}


// ====================================================
// READ ROUTE (GET)
// ====================================================

// app.get("/") means:
//
// When user enters:
//
// localhost:3010
//
// this route runs
app.get("/", function (req, res) {

  console.log("user entered /");

  // Go to MongoDB collection called "plans"
  db.collection("plans")

    // Find all data
    .find()

    // Convert MongoDB cursor into array
    .toArray((err, data) => {

      // If error happens
      if (err) {
        console.log(err);

        return res.end(
          "Something went wrong. Please try again!"
        );
      }

      // Render reja.ejs page
      //
      // Send data into EJS
      //
      // items = MongoDB data
      // getIcon = function for icons
      res.render("reja", {
        items: data,
        getIcon: getIcon,
      });
    });
});


// ====================================================
// CREATE ROUTE
// ====================================================

// POST request
//
// browser.js sends:
//
// axios.post("/create-item")
app.post("/create-item", function (req, res) {

  // Get title from frontend
  const newReja = req.body.reja;

  // Get comment from frontend
  const newComment =
    req.body.comment || "";

  // Insert into MongoDB
  db.collection("plans").insertOne(
    {
      reja: newReja,
      comment: newComment,
    },

    (err, data) => {

      // If error
      if (err) {
        console.log(err);

        return res.json({
          state: "fail",
        });
      }

      // Send created item back
      //
      // browser.js uses response.data
      res.json(data.ops[0]);
    }
  );
});


// ====================================================
// DELETE ONE ITEM
// ====================================================

app.post("/delete-item", function (req, res) {

  // Get id from frontend
  const id = req.body.id;

  // Delete item by MongoDB ObjectId
  db.collection("plans").deleteOne(
    {
      _id:
        new mongodb.ObjectId(id),
    },

    function (err) {

      // If error
      if (err) {
        console.log(err);

        return res.json({
          state: "fail",
        });
      }

      // Success message
      res.json({
        state: "success",
      });
    }
  );
});


// ====================================================
// EDIT ITEM
// ====================================================

app.post("/edit-item", function (req, res) {

  // Get id from frontend
  const id = req.body.id;

  // Get new title
  const newInput =
    req.body.new_input;

  // Get new comment
  const newComment =
    req.body.new_comment || "";

  // Find item and update it
  db.collection("plans")
    .findOneAndUpdate(
      {
        _id:
          new mongodb.ObjectId(id),
      },

      {
        // $set updates fields
        $set: {
          reja: newInput,
          comment: newComment,
        },
      },

      function (err) {

        if (err) {
          console.log(err);

          return res.json({
            state: "fail",
          });
        }

        // Send success
        res.json({
          state: "success",
        });
      }
    );
});


// ====================================================
// DELETE ALL ITEMS
// ====================================================

app.post("/delete-all", function (req, res) {

  // Safety check
  if (req.body.delete_all) {

    // Delete everything
    db.collection("plans")
      .deleteMany({}, function (err) {

        if (err) {
          console.log(err);

          return res.json({
            state: "fail",
          });
        }

        // Send success message
        res.json({
          state:
            "All items deleted successfully",
        });
      });
  }
});


// Export app
//
// server.js imports this:
//
// const app = require("./app")
module.exports = app;