const fs = require("fs")

const cars = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../data/cars.json`
  )
)

const checkId = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val)

  if (!car) {
    return res.status(400).json({
      status: "Failed",
      message: `Data with ${val} its not found`,
    })
  }
  next()
}

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.plate) {
    return res.status(400).json({
      status: "Failed",
      message: "Name or Plate are required",
    })
  }
}

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  })
}

const getCarById = (req, res) => {
  const id = req.params.id
  console.log(id)
  const car = cars.find((el) => el.id === id)

  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  })
}

const createCar = (req, res) => {
  const newId = cars[cars.length - 1].id + 1
  const newData = Object.assign(
    { id: newId },
    req.body
  )

  cars.push(newData)
  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          car: newData,
        },
      })
    }
  )
}

const updateCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  cars[carIndex] = {
    ...cars[carIndex],
    ...req.body,
  }

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `This car data with id ${id} has been edited`,
      })
    }
  )
}

const deleteCar = (req, res) => {
  const id = req.params.id
  const carIndex = cars.findIndex(
    (el) => el.id === id
  )

  cars.splice(carIndex, 1)

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "Data has been deleted",
        data: null,
      })
    }
  )
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  checkId,
  checkBody,
}
