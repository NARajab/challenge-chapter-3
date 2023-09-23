const express = require("express")
const pingSuccessfullyController = require("../controllers/pingSuccessfullyController")
const router = express.Router()

router
  .route("/")
  .get(
    pingSuccessfullyController.pingSuccessfully
  )

module.exports = router
