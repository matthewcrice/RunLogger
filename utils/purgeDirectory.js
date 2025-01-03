const fs = require('fs');
const path = require('path');

function purgeDirectory(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.rmdirSync(directoryPath, { recursive: true }); // Delete directory and its contents
        fs.mkdirSync(directoryPath); // Recreate the directory
    }
}

module.exports = purgeDirectory;
