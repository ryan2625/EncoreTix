//Retrieves a list of attractions, filtering by the user's search parameters.

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

//Retrieves the attraction details of one attraction, as well as making a call to get the upcoming events for that attraction

const getOneAttraction = async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${process.env.API_KEY}`)
        const response2 = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&attractionId=${id}&apikey=${process.env.API_KEY}`)
        const singleData = await response.json();
        const eventData = await response2.json();
        res.status(200).json({ singleData, eventData })
    } catch (error) {
        res.status(400).json({ mssg: `Error fetching attractions ${error}` })
    }
}

module.exports = {
    getAllAttractions,
    getOneAttraction
}