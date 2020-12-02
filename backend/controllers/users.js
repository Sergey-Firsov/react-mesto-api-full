const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/badRequest.js');
const NotFound = require('../errors/notFound.js');
const Conflict = require('../errors/conflict.js');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new NotFound('Произошла ошибка')));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound('Нет пользователя с таким id'))
    .then((user) => res.status(200).send(user))
    .catch(() => next(new NotFound('Нет пользователя с таким id')));
};

const createUser = (req, res, next) => {
  const {
    name, about, email, password, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, email, password: hash, avatar,
    }))
    .then((user) => res.status(201).send({
      data: {
        _id: user._id,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      }
      next(new BadRequest('Переданы некорректные данные'));
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(() => next(new BadRequest('Переданы некорректные данные')));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(() => next(new BadRequest('Переданы некорректные данные')));
};

const getCurrentUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(() => next(new NotFound('Нет пользователя с таким id')));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        ({ _id: user._id }),
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUserData,
};
