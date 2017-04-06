let fs = require('fs');

module.exports = function() {
  let fileReader = {};
  /**
   * read blog index infomation
   * @param  {String} path path of folder
   * @return {Array}      name of files under the folder
   */
  fileReader.readIndex = function(path, callback) {
    fs.readdir(path, function(err, files) {
      if (err) {
        console.error(err);
      }
      if (callback) {
        callback(files, err);
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

  fileReader.readFile = function(filePath, callback) {
    fs.readFile(filePath, {flag: 'r', encoding: 'utf8'}, function(err, data) {
      if (err) {
        console.error(err);
      }
      if (callback) {
        callback(data, err);
      }
      return data;
    });
  };
  return fileReader;
};
