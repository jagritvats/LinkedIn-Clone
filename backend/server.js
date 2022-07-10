const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const messageRouter = require('./routes/messageRoutes');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Root');
});

app.use((req, res, next) => {
	console.log(req.url);
	next();
});
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
// app.use('/api/messages', messageRouter);

app.use(errorHandler);

const listener = app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${listener.address().port}`);
});
