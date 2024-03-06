const express = require("express");
const path = require("path");
const { connectToDB } = require("./connection");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const URL = require("./models/url");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8001;

connectToDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
