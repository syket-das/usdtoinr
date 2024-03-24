const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const money = require('./money/money.routes');
const exchangeRate = require('./exchange-rate/exchange-rate.routes');
const bankAccount = require('./bank/bank.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/money', money);
router.use('/exchange-rate', exchangeRate);
router.use('/bank', bankAccount);

module.exports = router;
