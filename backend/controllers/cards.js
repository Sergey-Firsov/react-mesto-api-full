const Card = require('../models/card');

function sendError(res, err) {
  if (err.message === 'NotValidId') {
    res.status(404).send({ message: 'Нет карточки с таким id' });
  } else {
    res.status(404).send({ message: 'Нет карточки с таким id' });
  }
}

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => sendError(res, err));
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => sendError(res, err));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => sendError(res, err));
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
