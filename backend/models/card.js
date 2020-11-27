const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return /^https?:\/\/w*\.?[0-9a-zA-Z_\W]+(\.[a-zA-Z]+)+[0-9a-zA-Z_\W]*#?$/im.test(v);
      },
      message: 'Введите ссылку на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
