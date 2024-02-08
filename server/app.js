require("dotenv").config();
const cors = require("cors")
const express = require("express")
const attractionsRoutes = require("./router/attractions")
// Routes

/**
 * Backend for Encoretix
 */

const app = express()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:8081"
  }));

app.use("/api/attractions", attractionsRoutes)

app.listen(4000, () => {
    console.log("App up and running")
})