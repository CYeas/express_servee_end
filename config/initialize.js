let fs = require('fs');
let path = require('path');

let CONFIGPATH = __dirname + '/config.json';
//attribute
let htmlHeader = '';
// read config file and translate into json
function readConfig(resolve, reject) {
  let config;
  fs.readFile(CONFIGPATH, {flag: 'r', encoding: 'utf8'}, function(err, data) {
    if(err) {
      reject(err);
    } else {
      config = JSON.parse(data);
      resolve(config);
    }
  })
}

function initializeServer(configFile, err) {
  //get the html Template and parse it
  function getTemplate(data) {
    return new Promise(function(resolve, reject) {
      let header = data.header;
      resolve(data);
    });
  }
  //
  function parserDone(err) {
    return new Promise(function(resolve, reject) {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    })
  }

  if (err) {
    return parserDone(err);
  } else {
    // return a promise object contain the infomation of done
    return getTemplate(configFile).then(parserDone(null));
  }
}
// excute the initialize program and return a promise project with the info of final status (err or null)
new Promise(readConfig)
  .then(initializeServer)
  .catch(function(err) {
    return new Promise(function(resolve, reject) {
      reject(err);
    })
  });
