const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use route modules
const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const filesRouter = require('./routes/files');

app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/files', filesRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});