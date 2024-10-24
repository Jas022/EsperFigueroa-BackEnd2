const mongoose = require("mongoose");


const mongoURI =
  "mongodb+srv://jasmin09:Jas21@esperfigueroa-backend2.hjfkr.mongodb.net/";


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas", error);
    process.exit(1);
  }
};

module.exports = connectDB;
