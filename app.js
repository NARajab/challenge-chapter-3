const express = require("express");
const fs = require("fs");

const app = express();

// Midelware
app.use(express.json());

// Port
const PORT = process.env.PORT || 8000;

const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  });
});

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  });
});

app.get("/api/v1/cars/:id", (req, res) => {
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
});

app.post("/api/v1/cars", (req, res) => {
  const newId = cars[cars.length - 1].id + 1;
  const newData = Object.assign({ id: newId }, req.body);

  cars.push(newData);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        car: newData,
      },
    });
  });
});

app.put("/api/v1/cars/:id", (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(400).json({
      status: "Failed",
      message: `Data with ${id} its not found`,
    });
  }
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: `This car data with id ${id} has been edited`,
    });
  });
});

app.delete("/api/v1/cars/:id", (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(400).json({
      status: "Failed",
      message: "Data car its not found",
    });
  }
  cars.splice(carIndex, 1);

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: "Data has been deleted",
      data: null,
    });
  });
});

app.listen(PORT, () => {
  console.log(`App running into http://localhost:${PORT}...`);
});
