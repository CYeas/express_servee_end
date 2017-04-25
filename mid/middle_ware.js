let fileReader = require('./helper/read_file_helper')();
let markdown2Html = require('./helper/md2html_helper');
let fileWrite = require('./helper/write_file_helper');
let dataBaseHelper = require('./helper/sqlite_db_helper.js');
let fs = require('fs');

module.exports = function() {
  let middleWare = {}
   //get index page infomation and send it just for temporary use cause has no index page;
  //middleWare.getIndexPage = function (req, res, next) {
    //let files = fileReader.readIndex((config.blogPath + req.path).slice(0, -1), function(files) {
      //let index = [];
      //for (let i in files) {
        //index[i] = (req.path + files[i]).slice(0, -3);
      //}
      //res.send(index);
      //next();
    //});
  //}

  //middleWare.getIndex = function(req, res, next) {
    //let absolutePath = (config.blogPath + req.body.path);
    //fileReader.readIndex(absolutePath.slice(0, -1), function(files, err) {
      //if (err) {
        //let response = {"status": 1, "err": err};
        //res.send(response);
      //} else {
        //let index = {status: 0,folder: [], blog: []};
        //for (let i in files) {
          //if (fs.statSync(absolutePath + files[i]).isDirectory()) {
            //index.folder.push(files[i]);
          //} else {
            //index.blog.push((req.path + files[i]).slice(0, -3));
          //}
        //}
        //res.send(index);
      //}
      //next();
    //});
  //}

     //get a blog and return it
  middleWare.readBlog = function(req, res, next) {
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

    //middleWare.writeBlog = function(req, res, next) {
      //fileWrite.mkfolder(req.body.folder, function(err) {
        //err ? console.error(err) : function() {};
        //fileWrite.writeBlog(req.body.title, req.body.text, function(err) {
          //err ? console.error(err) : function() {};
        //});
      //});
      //dataBaseHelper.storeBlog(req.body.title, req.body.folder, req.body.tagName, req.body.userId, function(err) {
        //err ? console.error(err) : function() {};
      //});
    //}

    //middleWare.login = function(req, res, next) {

    //}

    middleWare.signUp = function(req, res, next) {
        let result = {};
        dataBaseHelper.signUp(req.body.userName, req.body.password, function(err) {
            if (err) {
                result.status = 1;
                result.error = err;
            } else {
                result.status = 0;
                result.error = '';
            }
            res.send(result);
            next();
        });
    }

    middleWare.logIn = function(req, res, next){
        result = {};
        dataBaseHelper.logIn(res.body.username, res.body.password, function(err, user) {
          if (err) {
            result.status = 1;
            result.error = err;
            result.userName = '';
          } else {
              if (user) {
                result.status = 0;
                result.userName = user.userName;
                result.error = '';
              } else {
                result.status = 1;
                result.error = 'username or password wrong';
                result.userName = '';
              }
          }
        res.send(result);
        next();
      });
    };

  return middleWare;
};
