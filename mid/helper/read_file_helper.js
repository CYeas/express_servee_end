let fs = require('fs');

module.exports = function() {
  /**
   * read blog index infomation
   * @param  {String} path path of folder
   * @return {Array}      name of files under the folder
   */
    function readIndex(path) {
        fs.readdir(path, function(err, files) {
            if (err) {
                return console.err(err);
            }
            return files;
        });
    }
  /**
   * readFile
   * @param  {String}   filePath
   * @param  {Function} callback
   * @return {String}            file content
   */

    function readFile(filePath, callback) {
        fs.readFile(filePath, {flag: 'r', encoding: 'utf8'}, function(err, data) {
            if (err) {
                return console.err(err);
            }
            if (callback) {
                callback(data);
            }
            return data;
        });
    }
}
