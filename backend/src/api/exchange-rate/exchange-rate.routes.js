const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const {
  addExchangeRate,
  getExchangeRates,
} = require('./exchange-rate.services');

const router = express.Router();

router.post('/add', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const { rate } = req.body;

    const result = await addExchangeRate(userId, { rate: Number(rate) });

    res.json({
      success: true,
      message: 'Exchange rate added successfully',
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const result = await getExchangeRates();

    res.json({
      success: true,
      message: 'Exchange rate fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
