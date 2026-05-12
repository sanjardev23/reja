// This imports Node.js built-in "http" module
// We use it to create a real web server from our Express app
const http = require("http");

// This imports MongoDB package
// We use it to connect Node.js with MongoDB Atlas database
const mongodb = require("mongodb");

// This variable will keep our connected database
// Later app.js can use this db variable
let db;

// This is your MongoDB Atlas connection link
// It tells Node.js where your database is located
const connectionString =
  "mongodb+srv://mksanjar04_db:Sanjar0404@cluster0.c28osjk.mongodb.net/";

// This connects Node.js to MongoDB
mongodb.connect(
  connectionString,
  {
    // These options help MongoDB driver connect correctly
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  // This callback runs after MongoDB connection result comes
  (err, client) => {
    // If connection has error, show error message
    if (err) {
      console.log("ERROR on connection MongoDB");
    } else {
      // If connection is successful, show success message
      console.log("MongoDB connection succeed");

      // client.db() chooses the database from MongoDB connection
      // We save it inside db variable, so app.js can use it
      db = client.db();

      // Now we import app.js
      // Important: we import app.js AFTER database connection succeeds
      const app = require("./app");

      // This creates real server using our Express app
      const server = http.createServer(app);

      // This is the port number where our website will run
      const PORT = 3010;

      // This starts the server
      // After this, website opens at http://localhost:3010
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);

// This exports db function
// app.js uses require("./server").db()
// So app.js can access MongoDB database
module.exports.db = function () {
  return db;
};