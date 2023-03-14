require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hello', (req, res) => {
  res.send(' 10000000000002 Hello! ');
});

// Route to handle POST requests to the /api/echo endpoint
app.post('/api/echo', (req, res) => {
  const message = req.body.message;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  res.json({ message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
