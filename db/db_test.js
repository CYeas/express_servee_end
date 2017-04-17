let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./blog_db.db');

function testEach() {
  db.serialize(function(){
    db.each("SELECT rowid AS id, userName, password FROM User \
              WHERE id = 2 ", function(err, row) {
      console.log(err);
      console.log(row.id + ' ' + row.userName + ' ' + row.password);
    });
  });
  db.close();
}

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

function insertTestUser() {
  let user1 = ["cyea", "123456"];
  let user2 = ["miao", "12345"];
  db.serialize(function() {
    db.run("INSERT INTO User VALUES(?, ?)", user1, function(err) {
      err ? console.error(err) : function() {};
    });
    db.run("INSERT INTO User VALUES(?, ?)", user2, function(err) {
      err ? console.error(err) : function() {};
    });
  })
}

function insertTestBlog() {
  let blog1 = ["Text1", "test", 1, 2017, 4, 12];
  let blog2 = ["Text2", "test", 2, 2017, 4, 13];
  db.serialize(function() {
    for (let i = 0; i < 5; i++) {
      db.run("INSERT INTO Blog VALUES(?,?,?,?,?,?)", blog1, function(err) {
        err ? console.error(err) : function() {};
      });
    }
    for (let i = 0; i < 5; i++) {
      db.run("INSERT INTO Blog VALUES(?,?,?,?,?,?)", blog2, function(err) {
        err ? console.error(err) : function() {};
      });
    }
  })
}

//insertTestUser();
//insertTestBlog();
//db.close();

getBlogsIndexByTime(1, 10, function(err, rows) {
  err ? console.error(err) : function() {};
  console.log(rows);
})
