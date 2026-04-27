// BSSR
console.log('Web Serverni boshlash');

const express = require("express");
const app = express();


// MongoDB connect  
const db = require("./server").db();


// 1: Kirish code
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 2: Session code

// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");


// 4: Routing code
app.post("/create-item", (req, res) => {
    console.log(req.body);
    res.json({ test: "success" });
});

app.get("/", function(req, res) {
    res.render("reja");
});



// app.get("/gift", function(req, res) {
//     res.end(`<h1>Siz Sovgalar bolimidasiz</h1>`);
// });



module.exports = app;
