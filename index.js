const compression = require("compression");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./routes/User");
app.use("/user", userRoutes);

const tokenMiddleware = require("./middleware/Token");
app.use("/", tokenMiddleware);

app.get("/", (req, res) => {
  res.json({ status: true, data: null, message: "Hello World" });
});

//middleware
app.use((req, res, next) => {
  console.log("Middleware called.");
  console.log(req.path, req.method);
  next();
});

const todoRoutes = require("./routes/Todo");
app.use("/todo", todoRoutes);

// Not Found handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    status: "error",
    code: error.status || 500,
    path: req.path,
    method: req.method,
    message: error.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
