let express = require('express');
let md = require('markdown').markdown;
let router = require('./router/root.js');

let app = express();
app.use(router);

app.listen(3000, function() {
    console.log('listen on 3000');
})
