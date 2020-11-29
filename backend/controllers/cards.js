const Card = require('../models/card');
const BadRequest = require('../errors/badRequest.js');
const NotFound = require('../errors/notFound.js');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new NotFound('Произошла ошибка')));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(() => next(new BadRequest('Переданы некорректные данные')));
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFound('Нет карточки с таким id'))
    .then((card) => res.status(200).send(card))
    .catch(() => next(new NotFound('Нет карточки с таким id')));
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFound('Нет карточки с таким id'))
    .then((user) => res.status(200).send(user))
    .catch(() => next(new NotFound('Нет карточки с таким id')));
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFound('Нет карточки с таким id'))
    .then((card) => res.status(200).send(card))
    .catch(() => next(new NotFound('Нет карточки с таким id')));
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
