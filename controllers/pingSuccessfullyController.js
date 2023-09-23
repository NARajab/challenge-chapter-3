const pingSuccessfully = (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  })
}

module.exports = { pingSuccessfully }
