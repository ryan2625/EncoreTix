const express = require("express")

const { getAllEvents, getOneEvent } = require("../controller/eventsController")

/**
 * Router for api calls
 * 
 * important routes:
 * /discovery/v2/attractions
 * /discovery/v2/attractions/{id}
 */

const router = express.Router()

router.get("/all", getAllEvents)
router.get("/:id", getOneEvent)

module.exports = router;