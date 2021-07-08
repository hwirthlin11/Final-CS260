var express = require("express");
var authRouter = require("./auth");
var appointmentRouter = require("./appointment");

var app = express();

app.use("/auth/", authRouter);
app.use("/appointment/", appointmentRouter);

module.exports = app;
