const express = require("express")
const morgan = require("morgan")

const app = express()

const carPingRouter = require("./routes/pingSuccessfullyRoutes")
const carRouter = require("./routes/carRoutes")

app.use(morgan("dev"))
app.use(express.json())

// Port
const PORT = process.env.PORT || 8000

app.use("/", carPingRouter)
app.use("/api/v1/cars", carRouter)

app.listen(PORT, () => {
  console.log(
    `App running into http://localhost:${PORT}...`
  )
})
