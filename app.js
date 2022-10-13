const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const uri = process.env.MONGO_DB;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB atlas connection established successfully");
});

app.listen(3000, () => {
    console.log("server running on port 3000")
});
