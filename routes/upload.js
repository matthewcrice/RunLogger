const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const router = express.Router();

// ----------------------------------------------------------------------------
// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// --------------------------------------------------------
router.get('/', (req, res) => {
    res.render('upload', { title: 'upload' });
});

router.post('/', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
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

module.exports = router;