require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const { login, register } = require("./controllers/auth.controller");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/register", register);

//connecting ans starting server


app.listen(3000, async () => {
  try {
    await connect();
    console.log("listening on port 5000.....");
  } catch (err) {
    console.log(err);
  }
});
