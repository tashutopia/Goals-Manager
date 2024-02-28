const express = require('express')
const router = express.Router();

const Data = require('../models/goal');

// Define a route to fetch data from MongoDB
router.get('/', async (req, res) => {
    try {
        // Fetch data from the MongoDB collection
        const data = await Data.find();

        // Send the data as JSON response
        res.json(data);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to update data in MongoDB
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body;
    try {
        // Update the specified document in the MongoDB collection
        const updatedData = await Data.findByIdAndUpdate(id, { [field]: value }, { new: true });
        // Send the updated data as JSON response
        res.json(updatedData);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;