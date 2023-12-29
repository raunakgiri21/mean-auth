const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const app = express();

const port = 8000;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // HTTP logger

// import routes
const user = require("./routes/user");

// routes
app.use("/api/v1/user", user);

const start = async () => {
  try {
    await connectDB("mongodb://localhost:27017/mean-auth");
    app.listen(port, () => {
      console.log(`The server is listening to http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
