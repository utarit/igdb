const express = require('express');
const router = express.Router();
const auth  = require('../middleware/auth');
const { getAllGames, addGame, deleteGame, getSingleGame } = require('../controllers/games');
const { signUp, signUpValidation, loginValidation, login, getAllUsers, getUser } = require('../controllers/users');

router.route('/games')
    .get(getAllGames)
    .post(addGame);


router.route('/games/:id')
    .get(getSingleGame)
    .delete(deleteGame);

router.route('/signup')
    .get()
    .post(signUpValidation, signUp);

router.route('/login')
    .get()
    .post(loginValidation, login);

router.route('/users')
    .get(getAllUsers);

router.route('/me')
    .get(auth, getUser);

module.exports = router;
