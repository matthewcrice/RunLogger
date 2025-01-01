const express = require('express');
const router = express.Router();

// Define routes for different pages
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// Define the root route to render the map
router.get('/map', (req, res) => {
    res.render('map', { lat: 47.69411106929967, lng: -122.1824089496762 });
});

module.exports = router;