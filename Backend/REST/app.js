const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
 
app.use(cors());
app.use(bodyParser.json());

//Import Route
//Here we are calling the posts.js file whenever we type /posts in the url
//This is used for code management, it is more found beneficial if there is multiple directories(/posts, /...)
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

//ROUTES
//This function sends a respones to the '/' directory using res.send function
app.get("/", (req, res) => {
  res.send("We Are on Home");
});

//DB Connection
mongoose.connect(process.env.db_connection, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

//LISTEN
app.listen(3022);
