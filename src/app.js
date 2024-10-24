const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/config.js"); 
const { engine } = require("express-handlebars"); 

const app = express();


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", engine()); 
app.set("view engine", "handlebars");


app.get("/", (req, res) => {
  res.render("home", { title: "Inicio" }); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
