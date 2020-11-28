const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  getUsers, getProfile, createUser, updateProfile, updateAvatar, login, getCurrentUserData,
} = require('../controllers/users');

router.post('/signup', createUser);

router.post('/signin', login);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getCurrentUserData);

router.get('/users/:userId', auth, getProfile);

router.patch('/users/me', auth, updateProfile);

router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
