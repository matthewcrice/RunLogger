const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;

// ----------------------------------------------------------------------------
// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
        },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

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

app.get('/upload', (req, res) => {
    res.render('upload', { title: 'upload' });
});

// Define the root route to render the map
app.get('/map', (req, res) => {
    res.render('map', { lat: 47.69411106929967, lng: -122.1824089496762 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});