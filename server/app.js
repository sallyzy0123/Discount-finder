'use strict';
const express = require('express');
const app = express();
var cors = require('cors');

const bookmarkRoute = require('./routes/bookmarkRoute');
const port = 3000;

app.use(cors())
app.use(express.json());// for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-w

app.use('/bookmark', bookmarkRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
