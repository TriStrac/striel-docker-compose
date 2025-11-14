const express = require('express');
const app = express();
const path = require('path');

// Get port from environment variable or default to 4300
const port = process.env.PORT || 4300;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/striel-xyz/browser')));

// Send all requests to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/striel-xyz/browser/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
