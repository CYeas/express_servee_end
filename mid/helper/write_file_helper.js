let fs = require('fs');

function mkfolder(folder, callback) {
  let folderPath = config.blogPath + '/' + folder;
  if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath, function(err) {
      callback ? callback(err) : function() {};
    })
  } else {
    callback ? callback(null) : function() {};
  }
}

function writeBlog(title, text, callback) {
  fs.writeFile(config.blogPath + '/' + title + '.md', text, function(err) {
    callback ? callback(err) : function() {};
  });
}

exports.mkfolder = mkfolder;
exports.writeBlog = writeBlog;
