const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/w*\.?[0-9a-zA-Z_\W]+(\.[a-zA-Z]+)+[0-9a-zA-Z_\W]*#?$/im.test(v);
      },
      message: 'Введите ссылку на изображение',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
