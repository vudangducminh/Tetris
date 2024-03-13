const express = require("express");
const app = express();
const path = require("path");
const port = 8088;
const appPath = path.join(__dirname);

console.log(__dirname);
console.log(appPath);

app.use(express.json());
app.use(express.static(appPath));
app.use(express.urlencoded({extended: false}));

app.set("view engine", "hbs");
app.set("views", appPath);

app.get('/', (request, response) => { // function(request, response)
    response.render("tetris");
})

app.listen(port, (request, response) => { 
    console.log("App run successfully on port: ", port);
});
