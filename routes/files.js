const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const dir = path.join(__dirname, '../uploads');
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.render('files', { files: files });
    });
});

router.get('/parse/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        const gpxFilePath = `/uploads/${req.params.filename}`;
        res.render('gpx', { gpxFilePath: gpxFilePath });
    });
});

router.get('/render-multiple', (req, res) => {
    const dir = path.join(__dirname, '../uploads/extracted');
    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const gpxFiles = files.filter(file => path.extname(file).toLowerCase() === '.gpx');
        res.render('multiple-gpx', { gpxFiles: gpxFiles });
    });
});

module.exports = router;
