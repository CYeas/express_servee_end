let fileReader = require('./helper/read_file_helper');
let markdown2Html = require('./helper/md2html_helper');

module.exports = function(configFile) {
    let config = configFile;
// get index infomation and send it;
    function getIndex(req, res, next) {
        let files = fileReader.readIndex(config.blogPath + req.path);
        res.send(files.map(function(e) {
            return (req.path + e);
        }));
        next();
    }

// get a blog and return it

    function readBlog(req, res, next) {
        let data = fileReader.readFile(config.blogPath + req.path)
        if (req.query.render === 1) {
            res.render(markdown2Html(data));
        } else {
            res.send(data);
        }
        next();
    }
}
