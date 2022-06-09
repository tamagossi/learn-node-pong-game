const express = require('express');
const path = require('path');

const api = express();

api.use(express.static(path.join(__dirname, 'public')));
app.use('/', () => express.static('index.html'));

app.listen(3000);

module.exports = api;
