const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const GpxParser = require('gpxparser');
const app = express();
const port = 3000;

// ----------------------------------------------------------------------------
// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir); },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// New route to list uploaded files
app.get('/files', (req, res) => {
    const dir = 'uploads';
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err); }
        res.render('files', { files: files });
    }); }
);

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file'); }
        const gpx = new GpxParser();
        gpx.parse(data); res.render('gpx', {
            gpxData: gpx });
    });
});

//app.post('/upload', upload.single('file'), (req, res) => {
//    res.send('File uploaded successfully!');
//});

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

app.get('/files', (req, res) => {
    res.render('files', { title: 'files' });
});


// Define the root route to render the map
app.get('/map', (req, res) => {
    res.render('map', { lat: 47.69411106929967, lng: -122.1824089496762 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});