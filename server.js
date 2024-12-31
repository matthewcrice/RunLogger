const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different pages
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// Define the root route to render the map
app.get('/map', (req, res) => {
    res.render('map', { lat: 47.69411106929967, lng: -122.1824089496762 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});