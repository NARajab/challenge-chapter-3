const express = require("express")
const morgan = require("morgan")

const app = express()

const carPingRouter = require("./routes/pingSuccessfullyRoutes")
const carRouter = require("./routes/carRoutes")

app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

app.use("/", carPingRouter)
app.use("/api/v1/cars", carRouter)

module.exports = app
