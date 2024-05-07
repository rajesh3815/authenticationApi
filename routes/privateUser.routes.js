const express = require("express");
const { verifyToken } = require("../middleware/authuser");
const { userSpace } = require("../controller/privateUser");
const privateuserRouter = express.Router();

privateuserRouter.get("/privateUser", verifyToken, userSpace);

module.exports = privateuserRouter;
