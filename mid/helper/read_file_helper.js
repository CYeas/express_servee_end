let fs = require('fs');

module.exports = function() {
    function readIndex(path) {
        fs.readdir(path, function(err, files) {
            if (err) {
                return console.err(err);
            }
            return files;
        })
    }

    function readFile(filePath, callback) {
        fs.readFile(filePath, {flag: 'r', encoding: 'utf8'}, function(err, data) {
            if (err) {
                return console.err(err);
            }
            if (callback) {
                callback(data);
            }
            return data;
        })
    }
}

readIndex('./');
