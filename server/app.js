require("dotenv").config();
const cors = require("cors")
const express = require("express")
const eventsRoutes = require("./router/events")
// Routes

/**
 * Backend for Encoretix
 */

const app = express()

app.use(express.json())

app.use("/api/events", eventsRoutes)

app.use(cors())

app.listen(4000, () => {
    console.log("App up and running")
})