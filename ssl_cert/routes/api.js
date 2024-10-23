const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const router = express.Router();

// Enable CORS for this route
router.use(cors({
  origin: process.env.CORS_ORIGIN, // Use the environment variable for the origin
}));

// Define the API route
router.get('/call-api', async (req, res) => {
  try {
    const apiGatewayUrl = process.env.API_GATEWAY_URL; // Use the environment variable for the URL
    const response = await axios.get(apiGatewayUrl, {
      headers: {
        'x-api-key': process.env.API_KEY, // Use the environment variable for the API key
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error calling API Gateway:', error.response ? error.response.data : error.message);
    res.status(500).send('Error calling API Gateway');
  }
});

// Export the router
module.exports = router;
