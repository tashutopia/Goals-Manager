const mongoose = require('mongoose');

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
module.exports = mongoose.model('Goals', dataSchema);