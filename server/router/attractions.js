const express = require("express")

const { getAllAttractions, getOneAttraction } = require("../controller/attractionsController")

/**
 * Router for api calls
 * 
 * important routes:
 * /discovery/v2/events *
 * /discovery/v2/attractions/{id}
 */

const router = express.Router()

router.get("/:searchTerm", getAllAttractions)
router.get("/one/:id", getOneAttraction)

module.exports = router;