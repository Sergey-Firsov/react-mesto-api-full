require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
//const rateLimit = require('express-rate-limit');
//const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/Logger.js');
const NotFound = require('./errors/notFound.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(helmet());
app.use(cors());

app.use(requestLogger);

/*const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Вы превысили количество запросов',
});
app.use(limiter);*/

app.use('/', usersRouter);

app.use('/', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT);
