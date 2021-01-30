const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth.js');
const {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUserData,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).custom((value, helpres) => {
      if (/\S/.test(value)) {
        return value;
      }

      return helpres.message('Пароль не должен состоять только из поробелов');
    }),
    avatar: Joi.string().custom((value, helpres) => {
      if (/^https?:\/\/w*\.?[0-9a-zA-Z-]+(\.[0-9a-zA-Z-])*\.[a-zA-Z]+\S*#?$/im.test(value)) {
        return value;
      }

      return helpres.message('Введена некорректная ссылка');
    }),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).custom((value, helpres) => {
      if (/\S/.test(value)) {
        return value;
      }

      return helpres.message('Пароль не должен состоять только из пробелов');
    }),
  }),
}), login);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getCurrentUserData);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), auth, getProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpres) => {
      if (/^https?:\/\/w*\.?[0-9a-zA-Z-]+(\.[0-9a-zA-Z-])*\.[a-zA-Z]+\S*#?$/im.test(value)) {
        return value;
      }

      return helpres.message('Введена некорректная ссылка');
    }),
  }),
}), auth, updateAvatar);

module.exports = router;
