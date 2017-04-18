let express = require('express');
let init = require('./config/initialize.js');
let app = express();

init().then(function(config) {
  let router = require('./router/root.js');
  let session = require('express-session');
  app.use(session({
    secret: 'just for test',
    cookie: {maxAge: 24 * 60 * 60 * 1000}
  }));
  app.use(router);
  app.listen(3000, function() {
      console.log('listen on 3000');
  });
});
