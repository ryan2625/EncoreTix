require("dotenv").config();
const cors = require("cors")
const express = require("express")
const attractionsRoutes = require("./router/attractions")

/**
 * Backend for EncoreTix in Express.js. 
 * 
 * Our backend has one router, with 2 endpoints fetching data from Ticketmaster's discovery API.
 * We also use dotenv to hide our API key and cors to allow cross origin requests. 
 */

const app = express()

app.use(express.json())

//Allow requests from anywhere

app.use(cors({
    origin: "*"
  }));

app.use("/api/attractions", attractionsRoutes)

app.listen(4000, () => {
    console.log("App up and running")
})