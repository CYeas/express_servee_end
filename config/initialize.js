let fs = require('fs');
let path = require('path');
let initDb = require('../db/init_db.js');

let CONFIGPATH = __dirname + '/config.json';
//attribute
global.config = {};
// read config file and translate into json
function readConfig(resolve, reject) {
  fs.readFile(CONFIGPATH, {flag: 'r', encoding: 'utf8'}, function(err, data) {
    if(err) {
      reject(err);
    } else {
      config = JSON.parse(data);
      resolve();
    }
  });
}
// do some compute for config
function computeConfig() {
  return new Promise(function(resolve, reject){
    config.blogPath = __dirname +'/' + config.blogPath;
    initDb.initdb();
    resolve();
  });
}

module.exports = function () {
  return new Promise(readConfig)
    .then(computeConfig)
    .catch(function(err) {
      console.error(err);
    });
};
