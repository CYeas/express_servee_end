let fileReader = require('./helper/read_file_helper')();
let markdown2Html = require('./helper/md2html_helper');
let fs = require('fs');

module.exports = function() {
  let middleWare = {}
  middleWare.config = config;
  // get index page infomation and send it just for temporary use cause has no index page;
  middleWare.getIndexPage = function (req, res, next) {
    let files = fileReader.readIndex((config.blogPath + req.path).slice(0, -1), function(files) {
      let index = [];
      for (let i in files) {
        index[i] = (req.path + files[i]).slice(0, -3);
      }
      res.send(index);
      next();
    });
  }

  middleWare.getIndex = function(req, res, next) {
    let absolutePath = (config.blogPath + req.body.path);
    fileReader.readIndex(absolutePath.slice(0, -1), function(files, err) {
      if (err) {
        let response = {"status": 1, "err": err};
        res.send(response);
      } else {
        let index = {status: 0,folder: [], blog: []};
        for (let i in files) {
          if (fs.statSync(absolutePath + files[i]).isDirectory()) {
            index.folder.push(files[i]);
          } else {
            index.blog.push((req.path + files[i]).slice(0, -3));
          }
        }
        res.send(index);
      }
      next();
    });
  }

    // get a blog and return it
  middleWare.readBlog = function (req, res, next) {
    let data = fileReader.readFile(config.blogPath + req.path + '.md', function(data, err) {
      if (err) {
        let response = {"status": 1, "err": err}
        res.send(response);
      } else {
        let text = {};
        if (req.query.render === "0") {
          if(config.apiEdition){
            text = {"status": 0, "data": data};
          } else {
            text = data;
          }
        } else {
          if(config.apiEdition){
            text = {"status": 0, "data": markdown2Html(data)};
          } else {
            text = markdown2Html(data);
          }
        }
        res.send(text);
      }
      next();
    });
  };
  return middleWare;
};
