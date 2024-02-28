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

//create router
const goalsRouter = require('./routes/goals')
app.use('/data', goalsRouter) //use goalsRouter whenever /data

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});