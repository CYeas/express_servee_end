let sqlite3 = require('sqlite3').verbose();
/**
 * signup
 * @param  {string}   userName
 * @param  {string}   userPassword
 * @param  {Function} callback     param:err
 * @return
 */
function signUp(userName, userPassword, callback) {
  let db = new sqlite3.Database(config.dbPath);
  db.serialize(function() {
    db.run("INSERT INTO User VALUES (?, ?)", [userName, userPassword], function(err) {
      callback ? callback(err) : function() {};
    });
  });
  db.close();
}

function logIn(userName, userPassword, callback) {
  let db = new sqlite3.Database(config.dbPath);
  let param = [userName, userPassword];
  db.serialize(function() {
    db.get("SELECT userName FROM User\
            WHERE userName = ? AND password = ?",
      param, function(err, row) {
        callback(err, row);
      });
  });
  db.close();
}

function getBlogsIndexByTime(page, everPageSum, callback) {
  let db = new sqlite3.Database(config.dbPath);
  let offset = (page - 1) * everPageSum + 1;
  db.serialize(function() {
    db.all("SELECT title, folder, userName,\
            strftime('%Y', datetime(Blog.time, 'unixepoch', 'localtime')) AS year,\
            strftime('%m', datetime(Blog.time, 'unixepoch', 'localtime')) AS month,\
            strftime('%d', datetime(Blog.time, 'unixepoch', 'localtime')) AS day,\
            FROM Blog, User\
            WHERE Blog.userId = User.rowid\
            ORDER BY Blog.time DESC\
            LIMIT ?, ?",
            [offset, everPageSum],
            function(err, row) {
              callback(err, row);
            });
  });
  db.close();
}

function getBlogsIndexByFolder(folderName, page, everPageSum, callback) {
  let db = new sqlite3.Database(config.dbPath);
  let offset = (page - 1) * everPageSum + 1;
  let param = [folderName, offset, everPageSum]
  db.serialize(function() {
    db.all("SELECT title, userName,\
            strftime('%Y', datetime(Blog.time, 'unixepoch', 'localtime')) AS year,\
            strftime('%m', datetime(Blog.time, 'unixepoch', 'localtime')) AS month,\
            strftime('%d', datetime(Blog.time, 'unixepoch', 'localtime')) AS day,\
            FROM Blog, User\
            WHERE Blog.userId = User.rowid AND\
            folder = ?\
            ORDER BY Blog.time DESC\
            LIMIT ?, ?", param, function(err, row) {
              callback(err, row);
            })
  });
}

function getBlogsIndexByTag(tagName, page, everPageSum, callback) {
  let db = new sqlite3.Database(config.dbPath);
  let offset = (page - 1) * everPageSum + 1;
  let param = [tagName, offset, everPageSum]
  db.serialize(function() {
    db.all("SELECT title, userName,\
            strftime('%Y', datetime(Blog.time, 'unixepoch', 'localtime')) AS year,\
            strftime('%m', datetime(Blog.time, 'unixepoch', 'localtime')) AS month,\
            strftime('%d', datetime(Blog.time, 'unixepoch', 'localtime')) AS day,\
            FROM Blog, User, blogMapTag\
            WHERE Blog.userId = User.rowid AND\
            blogMapTag.blogId = Blog.rowid AND\
            blogMapTag.tagId = Tag.rowid\
            Tag.tagName = ?\
            ORDER BY Blog.time DESC\
            LIMIT ?, ?", param, function(err, row) {
              callback(err, row);
            })
  });
}

function storeBlog(title, folder, tagName, userId, callback) {
  let db = new sqlite3.Database(config.dbPath);
  let newBlog = [title, folder, userId];
  db.serialize(function() {
    db.run("INSERT INTO Blog VALUES(?, ?, ?, strftime('%s', 'now'))", newBlog, function(err) {
      callback ? callback(err) : function() {};
    })
    db.get("SELECT Blog.rowid AS blogId FROM Blog WHERE Blog.title = ?", [title], function(err, blogRow) {
      for (let tag in tagName) {
        db.get("SELECT Tag.rowid AS tagId FROM Tag\
        WHERE tagName = ?", [tagName], function(err, tagRow) {
          if (row.id) {
            db.run("INSERT INTO Tag VALUES(?)", [tagName], function(err) {
              callback ? callback(err) : function() {};
            });
          }
            db.run("INSERT INTO blogMapTag VALUES(?, ?)", [blogRow.blogId, tagRow.tagId], function(err) {
              callback ? callback(err) : function() {};
            });
        });
      }
    });
  })
}

exports.signUp = signUp;
exports.getBlogsIndexByTag = getBlogsIndexByTag;
exports.getBlogsIndexByTime = getBlogsIndexByTime;
exports.getBlogsIndexByFolder = getBlogsIndexByFolder;
exports.storeBlog = storeBlog;
