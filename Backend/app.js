const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { URI } = require("./keys");
require("./models/user");
require("./models/post");
app.use(cors());
//Connection to database
mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database....!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/user"));
app.use(require("./routes/posts"));

//server starting
app.listen(9000, () => {
  console.log("Server is running ...to", 9000);
});
