'use strict';
const express = require('express');
const app = express();
const cors = require('cors');

const postRouter = require('./routes/postRoute');
const commentRouter = require('./routes/commentRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const evaluationRouter = require('./routes/evaluationRoute');
const authRouter = require('./routes/authRoute');
const bookmarkRoute = require('./routes/bookmarkRoute');
const passport = require('./utils/passport');

const port = 3000;

app.use(express.static('uploads'));

app.use(cors())
    .use(express.json()) // for parsing application/json
    .use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    .use(passport.initialize());


app.use('/auth', authRouter)
    .use('/bookmark', bookmarkRoute)
    .use('/user', passport.authenticate('jwt', {session: false}), userRouter)
    .use('/category', categoryRouter)
    .use('/evaluation', passport.authenticate('jwt', {session: false}), evaluationRouter)
    .use('/post', postRouter)
    .use('/comment', commentRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
