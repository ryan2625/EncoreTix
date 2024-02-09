const express = require("express")
//Controller function for the routes.
const { getAllAttractions, getOneAttraction } = require("../controller/attractionsController")

/**
 * Router for handling API calls related to attractions.
 * 
 * This router defines two endpoints for retrieving attraction data:
 * - GET /api/attractions/:searchTerm - Retrieves a list of attractions, filtered by search term.
 * - GET /api/attractions/one/:id - Retrieves details regarding a specific attraction given by its unique ID.
 */

const router = express.Router()

router.get("/:searchTerm", getAllAttractions)

router.get("/one/:id", getOneAttraction)

module.exports = router;
