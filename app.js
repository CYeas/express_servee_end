let express = require('express');
let router = require('./router/root.js');

let init = require('./config/initialize.js');
let app = express();

init().then(function() {
  app.use(router);
  app.listen(3000, function() {
      console.log('listen on 3000');
  });
});
