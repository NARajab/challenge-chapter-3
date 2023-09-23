const express = require("express")
const carsController = require("../controllers/carsController")
const router = express.Router()

router.param("id", carsController.checkId)

router
  .route("/")
  .get(carsController.getAllCars)
  .post(
    carsController.checkBody,
    carsController.createCar
  )

router
  .route("/:id")
  .get(carsController.getCarById)
  .put(carsController.updateCar)
  .delete(carsController.deleteCar)

module.exports = router
