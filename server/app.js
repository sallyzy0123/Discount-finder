'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bookmarkRoute = require('./routes/bookmarkRoute');
const userRouter = require('./routes/userRoute')
const categoryRouter = require('./routes/categoryRoute')
const evaluationRouter = require('./routes/evaluationRoute')
const port = 3000;

app.use(express.static('uploads'));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/bookmark', bookmarkRoute);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
// app.use('/evaluation', evaluationRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
