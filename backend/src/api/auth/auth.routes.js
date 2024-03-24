const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const {
  findUserByEmail,
  createUserByEmailAndPassword,
} = require('../users/users.services');
const { generateTokens } = require('../../utils/jwt');
const { isAuthenticated } = require('../../middlewares');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name || !phone) {
      res.status(400);
      throw new Error(
        'You must provide an email, password,  name and a phone number.'
      );
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const user = await createUserByEmailAndPassword({
      name,
      email,
      phone,
      password,
    });
    const jti = uuidv4();
    const { accessToken } = generateTokens(user, jti);

    res.json({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken } = generateTokens(existingUser, jti);

    res.json({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/check-token', isAuthenticated, async (req, res, next) => {
  try {
    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
