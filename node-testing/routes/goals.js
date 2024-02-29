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

// Define a route to update data in MongoDB for array fields
router.put('/update-array/:id', async (req, res) => {
    const { id } = req.params;
    const { field, index, value } = req.body;
    try {
        // Create an object to represent the update operation with the positional operator
        let updateOperation = {};
        updateOperation[`${field}.${index}`] = value;

        // Update the specified document in the MongoDB collection
        const updatedData = await Data.findByIdAndUpdate(id, { $set: updateOperation }, { new: true });
        
        // Send the updated data as JSON response
        res.json(updatedData);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to delete a step at the specified index
router.delete('/deleteStep/:id/:index', async (req, res) => {
    const { id, index } = req.params;
    try {
        // Find the document by ID
        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Document not found' });
        }
        // Remove the step, date, and completed checkbox at the specified index
        data.Steps.splice(index, 1);
        data.Dates.splice(index, 1);
        data.Completed.splice(index, 1);
        // Save the updated document
        await data.save();
        res.status(200).json({ message: 'Step deleted successfully' });
    } catch (error) {
        console.error('Error deleting step:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;