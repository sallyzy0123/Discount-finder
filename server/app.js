'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const evaluationRouter = require('./routes/evaluationRoute');
const authRouter = require('./routes/authRoute');
const passport = require('./utils/passport');
const port = 3000;

app.use(express.static('uploads'));

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.initialize());

app.use('/auth', authRouter);
// app.use('/user', userRouter);
app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/category', passport.authenticate('jwt', {session: false}), categoryRouter);
app.use('/evaluation', passport.authenticate('jwt', {session: false}), evaluationRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
