const express   = require("express");
const router = require("./userRoute");

const route = express.Router();


route.use("/user",  require("./userRoute"));
route.use("/blog", require("./blogRoute"));


module.exports = route