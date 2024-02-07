//Get all events
const getAllEvents = async (req, res) => {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${process.env.API_KEY}`)
        const eventData = await response.json();
        res.status(200).json({ eventData })
    } catch (error) {
        res.status(400).json({ mssg: `Error fetching events ${error}` })
    }
}


//Get one event by ID
const getOneEvent = async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${process.env.API_KEY}`)
        const eventData = await response.json();
        res.status(200).json({ eventData })
        console.log(id)
    } catch (error) {
        res.status(400).json({ mssg: `Error fetching events ${error}` })
    }
}

module.exports = {
    getAllEvents,
    getOneEvent
}