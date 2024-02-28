const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

const mongoose = require('mongoose');
const uri = "mongodb+srv://tashugupta:datamanager@cluster0.rsdgrgw.mongodb.net/Goals?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

// Define a schema for your MongoDB collection
const dataSchema = new mongoose.Schema({
  Category: String,
  Goal: String,
  Priority: Boolean,
  Steps: Array,
  Dates:Array,
  Completed: Array
}, { collection: 'Goals' }); 

// Define a model based on the schema
const Data = mongoose.model('Goals', dataSchema);

// Define a route to fetch data from MongoDB

app.get('/data', async (req, res) => {
    try {
        // Fetch data from the MongoDB collection
        const data = await Data.find({});
        console.log(data);
        // Send the data as JSON response
        res.json(data);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});