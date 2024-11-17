//export const config = {
//PORT: 3000,
//MONGO_URL:
//  "mongodb+srv://Pedro2024:<User1>@cluster0.jkbawur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//DB_NAME: "Users",
//SECRET: "CoderCoder123",
//};

import dotenv from "dotenv";

dotenv.config({
  path: "./src/.env",
  override: true,
});

export const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  SECRET: process.env.SECRET,
};