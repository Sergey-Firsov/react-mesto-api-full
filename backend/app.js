require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/Logger.js');
const limiter = require('./middlewares/rateLimiter.js');
const errorHandler = require('./middlewares/errorHandler.js');
const invalidAddress = require('./middlewares/invalidAddress.js');

const { PORT = 4000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use(invalidAddress);

app.use(errorHandler);

app.listen(PORT);
