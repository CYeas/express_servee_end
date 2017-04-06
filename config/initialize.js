let fs = require('fs');
let path = require('path');

let CONFIGPATH = __dirname + '/config.json';
//attribute
let config = {};
// read config file and translate into json
function readConfig(resolve, reject) {
  fs.readFile(CONFIGPATH, {flag: 'r', encoding: 'utf8'}, function(err, data) {
    if(err) {
      reject(err);
    } else {
      config = JSON.parse(data);
      resolve(config);
    }
  });
}

module.exports = function () {
  new Promise(readConfig)
    .then(function() {
      return new Promise(function(resolve, reject) {
        resolve(null);
        console.log(config);
      });
    })
    .catch(function(err) {
      return new Promise(function(resolve, reject) {
        reject(err);
      });
    });
};
