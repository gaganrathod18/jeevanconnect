// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// MongoDB connection string (local MongoDB instance)
const mongoURI = 'mongodb://localhost:27017/jeevanconnect';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
app.use(express.static('public')); // To serve static files (HTML)

// Create a schema for the patient login data
const patientSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model from the schema
const Patient = mongoose.model('Patient', patientSchema);

// Define POST route to save form data to MongoDB
app.post('/patient-login-submit', (req, res) => {
  const { username, password } = req.body;

  // Create a new patient document
  const newPatient = new Patient({
    username,
    password
  });

  // Save the new patient data to MongoDB
  newPatient.save()
    .then(() => {
      res.send('Patient login data saved successfully');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error saving data');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
