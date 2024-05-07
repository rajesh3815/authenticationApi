const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(404).send({
        status: "failed",
        message: "error in token verification",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    //i am passing this in req because  if we need the user_id for further uses we can use    /optional/
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(404).send({
      status: "failed",
      message: "error in token verification",
    });
  }
};
module.exports={verifyToken}