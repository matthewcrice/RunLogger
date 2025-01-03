const express = require('express');
const fs = require('fs');
const path = require('path');
const unzipper = require("unzipper");
const purgeDirectory = require('../utils/purgeDirectory');
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
    const extractionDir = path.join(__dirname, '../uploads/extracted');
    if (!fs.existsSync(extractionDir)) {
        fs.mkdirSync(extractionDir);
    }

    fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: extractionDir }))
        .on('close', () => {
            res.redirect(`/files/render-multiple`); })
        .on('error', (err) => {
            res.status(500).send('Error extracting ZIP file: ' + err);
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

        // Asynchronously purge the extracted directory after rendering the view
        //setImmediate(() => { const extractionDir = path.join(__dirname, '../uploads/extracted');
        //    purgeDirectory(extractionDir);
        //});
    });
});

module.exports = router;
