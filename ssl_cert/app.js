

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



































// const express = require('express');
// const https = require('https');
// const path = require('path');
// const fs = require('fs');
// const cors = require('cors');
// const apiRoutes = require('./routes/api');  // Corrected path for API routes

// const app = express();

// // Enable CORS to allow frontend access
// app.use(cors({
//   origin: 'http://localhost:3000',  // Allow requests from the frontend
//   credentials: true  // If you need to allow cookies/authorization headers
// }));

// // Use the API routes
// app.use('/api', apiRoutes);

// // Root endpoint to confirm the server is running
// app.use('/', (req, res) => {
//   res.send('Hello from AWS SSL server');
// });

// // Load the SSL certificate and start the server
// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//   },
//   app
// );

// sslServer.listen(3443, () => console.log('Secure server 🚀🔑 running on https://localhost:3443'));
