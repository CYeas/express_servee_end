let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../../db/blog_db.db');
/**
 * signup
 * @param  {string}   userName
 * @param  {string}   userPassword
 * @param  {Function} callback     param:err
 * @return
 */
function signUp(userName, userPassword, callback) {
  db.serialize(function() {
    db.run("INSERT INTO User VALUES (?, ?)", [userName, userPassword], function(err) {
      callback ? callback(err) : function() {};
    });
  });
  db.close();
}

function getBlogsIndexByTime(page, everPageSum = 10, callback) {
  let offset = (page - 1) * everPageSum + 1;
  db.serialize(function() {
    db.all("SELECT title, folder, username, year, month, date FROM Blog, User \
            WHERE Blog.userId = User.rowid\
            ORDER BY Blog.rowid DESC\
            LIMIT ?, ?",
            [offset, everPageSum],
            function(err, row) {
              callback(err, row);
            });
  });
  db.close();
}
