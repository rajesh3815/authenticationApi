const express = require("express");
const userRouter = require("./routes/userauth.routes");
const privateuserRouter = require("./routes/privateUser.routes");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/user", privateuserRouter);

//health of api
app.get("/api/v1/health", (req, res) => {
  res.send({
    status: "Success",
    messsage: "Api is working",
  });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("database connected");
  } catch (error) {
    console.log("Error in database connection");
  }
  console.log(`Server is up on port ${port} :)`);
});
