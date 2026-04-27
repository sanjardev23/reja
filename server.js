// BSSR
console.log('Web Serverni boshlash');

const express = require("express");
const app = express();
const http = require("http")

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



const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
    );
}); 
