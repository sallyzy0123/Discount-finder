'use strict';
const express = require('express');
const app = express();
// const galleryRouter = require('../routes/galleryRoute');
const port = 3000;

app.get('/gallery', (req, res) => {
    res.send('From this endpoint you can get users.')
  });
// app.use('/gallery', galleryRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
