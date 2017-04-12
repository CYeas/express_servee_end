let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./blog_db.db');

// db.serialize(function(){
//   db.each("SELECT rowid AS id, userName, password FROM User \
//             WHERE id = 2 ", function(err, row) {
//     console.log(err);
//     console.log(row.id + ' ' + row.userName + ' ' + row.password);
//   });
// });
// db.close();

function getBlogsIndexByTime(page, everPageSum = 10, callback) {
  let offset = (page - 1) * everPageSum + 1;
  db.serialize(function() {
    db.all("SELECT title, folder, userName, year, month, date FROM Blog, User \
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

getBlogsIndexByTime(1, 10, function(err, rows) {
  err ? console.error(err) : function() {};
  console.log(rows);
})
