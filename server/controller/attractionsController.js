//Get all Attractions
const getAllAttractions = async (req, res) => {
    try {
        const { searchTerm } = req.params
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${searchTerm}&apikey=${process.env.API_KEY}`)
        const attractionData = await response.json();
        res.status(200).json({ attractionData })
    } catch (error) {
        res.status(400).json({ mssg: `Error fetching attractions ${error}` })
    }
}


//Get one Attraction by ID
const getOneAttraction = async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${process.env.API_KEY}`)
        const attractionData = await response.json();
        res.status(200).json({ attractionData })
        console.log(id)
    } catch (error) {
        res.status(400).json({ mssg: `Error fetching attractions ${error}` })
    }
}

module.exports = {
    getAllAttractions,
    getOneAttraction
}