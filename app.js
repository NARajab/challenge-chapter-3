const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
// Midelware
app.use(express.json());

// Port
const PORT = process.env.PORT || 8000;

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/data/cars.json`)
);

const pingSuccessfully = (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  });
};

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  });
};

const getCarById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const car = cars.find((el) => el.id === id);

  if (!car) {
    return res.status(400).json({
      status: "Failed",
      message: `Data with ${id} its not found`,
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  });
};

const createCar = (req, res) => {
  const newId = cars[cars.length - 1].id + 1;
  const newData = Object.assign(
    { id: newId },
    req.body
  );

  cars.push(newData);
  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          car: newData,
        },
      });
    }
  );
};

const updateCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex(
    (el) => el.id === id
  );

  if (carIndex === -1) {
    return res.status(400).json({
      status: "Failed",
      message: `Data with ${id} its not found`,
    });
  }
  cars[carIndex] = {
    ...cars[carIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `This car data with id ${id} has been edited`,
      });
    }
  );
};

const deleteCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex(
    (el) => el.id === id
  );

  if (carIndex === -1) {
    return res.status(400).json({
      status: "Failed",
      message: "Data car its not found",
    });
  }
  cars.splice(carIndex, 1);

  fs.writeFile(
    `${__dirname}/data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "Data has been deleted",
        data: null,
      });
    }
  );
};

const carPingRouter = express.Router();
const carRouter = express.Router();

carPingRouter.route("/").get(pingSuccessfully);

carRouter
  .route("/")
  .get(getAllCars)
  .post(createCar);

carRouter
  .route("/:id")
  .get(getCarById)
  .put(updateCar)
  .delete(deleteCar);

app.use("/", carPingRouter);
app.use("/api/v1/cars", carRouter);

app.listen(PORT, () => {
  console.log(
    `App running into http://localhost:${PORT}...`
  );
});
