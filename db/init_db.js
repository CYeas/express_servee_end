let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./blog_db.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS User (userName TEXT PRIMARY KEY, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Blog (title TEXT,  folder TEXT, userId INT, year INT, month INT, date INT, FOREIGN KEY(userId) REFERENCES User(id))");
  db.run("CREATE TABLE IF NOT EXISTS Tag (tagName TEXT,  blogId INT)");
  db.run("CREATE TABLE IF NOT EXISTS blogMapTag (blogId INT, tagId INT, FOREIGN KEY(blogId) REFERENCES Blog(id), FOREIGN KEY(tagId) REFERENCES Tag(id))");

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();
  //
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
});

db.close();
