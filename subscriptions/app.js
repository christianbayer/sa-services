// Import used packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

// Get the express server
const app = express();
const router = express.Router();

// Set environment variables
dotenv.config();

// Setup DB
const db = require('./db');

// Route handlers
const subscriptions = require('./routes/subscriptions');

// Configure the express server with some middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Setup routes
app.use('/subscriptions', subscriptions);

// Get the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, function () {
    console.log(`Listening on ${port}!`);
})