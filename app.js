let express = require('express');
let init = require('./config/initialize.js');
let app = express();

init().then(function(config) {
  let router = require('./router/root.js');
  app.use(router);
  app.listen(3000, function() {
      console.log('listen on 3000');
  });
});
