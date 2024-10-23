

const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/api');  // Corrected the path for API routes

const app = express();

// Use the API routes
app.use('/api', apiRoutes);

app.use('/', (req, res, next) => {
  res.send('Hello from AWS SSL server');
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
);

sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'));


































