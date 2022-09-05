const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

// app.get('/', (req, res) => {
// 	res.send('Root');
// });

app.use((req, res, next) => {
	console.log(req.url);
	next();
});
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
// app.use('/api/messages', messageRouter);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, '../frontend/build')));

// block all /api following requests from triggering this cool
app.get('*', (req, res) => {
	res.sendFile(
		path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
	); // change before deploying using path module
});

const listener = app.listen(process.env.PORT || 5000, () => {
	console.log(`Server Listening on port ${listener.address().port}`);
});
