const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth.js');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpres) => {
      if (/^https?:\/\/w*\.?[0-9a-zA-Z-]+(\.[0-9a-zA-Z-])*\.[a-zA-Z]{2,}\S*#?$/im.test(value)) {
        return value;
      }

      return helpres.message('Введена некорректная ссылка');
    }),
  }),
}), auth, createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, putLike);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, deleteLike);

module.exports = router;
