const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');
const user = require('./routes/userRoute');
const post = require('./routes/postRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', user);
app.use('/api/v1/post', post);

app.use(errorMiddleware);

module.exports = app;
