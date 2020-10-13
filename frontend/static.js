const express = require('express');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static('./dist/static'));

console.log('Listening on localhost:8080');
app.listen(8080);