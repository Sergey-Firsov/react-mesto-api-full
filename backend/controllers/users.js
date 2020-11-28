const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, email, password, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, email, password: hash, avatar,
    }))
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const getCurrentUserData = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        ({ _id: user._id }),
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUserData,
};
