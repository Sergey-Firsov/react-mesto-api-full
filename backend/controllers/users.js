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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
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

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
};
