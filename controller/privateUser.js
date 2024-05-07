const userSpace = (req, res) => {
  const { userId } = req;
  // console.log(userId);
  res.send({
    status: "Success",
    message: "This is a private route",
    userId,
  });
};

module.exports = { userSpace };
