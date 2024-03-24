const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const {
  addMoney,
  withdrawMoney,
  getUserMoneyRequests,
  getMoneyRequests,
  getUserWithdrawRequests,
  getWithdrawRequests,
  updateMoneyRequest,
  updateWithdrawRequest,
} = require('./money.services');
const { Status } = require('@prisma/client');
const { getExchangeRates } = require('../exchange-rate/exchange-rate.services');

const router = express.Router();

router.post('/add', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const { usdt, transactionId, accountNumber, method, message } = req.body;

    const data = {
      usdt: Number(usdt),
      transactionId,
      accountNumber,
      method,
      message,
    };

    const exchangeRate = await getExchangeRates();

    if (exchangeRate.length === 0) {
      throw new Error('Exchange rate not found');
    }

    // last exchange rate
    const lastExchangeRate = exchangeRate[exchangeRate.length - 1];

    const result = await addMoney(userId, data);

    res.json({
      success: true,
      message: 'Money added successfully',
      data: {
        ...result,
        exchangeRateId: lastExchangeRate.id,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/withdraw', isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.body, req.payload);
    const { userId } = req.payload;
    const {
      usdt,
      accountNumber,
      method,
      message,
      ifscCode,
      accountHolder,
      branchName,
    } = req.body;

    const data = {
      usdt: Number(usdt),
      accountNumber,
      method,
      message,
      ifscCode,
      accountHolder,
      branchName,
    };

    const exchangeRate = await getExchangeRates();

    if (exchangeRate.length === 0) {
      throw new Error('Exchange rate not found');
    }

    // last exchange rate
    const lastExchangeRate = exchangeRate[exchangeRate.length - 1];

    const result = await withdrawMoney(userId, {
      ...data,
      exchangeRateId: lastExchangeRate.id,
    });

    res.json({
      success: true,
      message: 'Money withdraw request sent successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/requests', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;

    const result = await getUserMoneyRequests(userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/requests/all',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const result = await getMoneyRequests();

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/withdraw-requests', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;

    const result = await getUserWithdrawRequests(userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/withdraw-requests/all',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const result = await getWithdrawRequests();

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/requests/:id/approve',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await updateMoneyRequest(id, {
        verified: true,
        status: Status.VERIFIED,
      });

      res.json({
        success: true,
        message: 'Money request approved successfully',
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  '/requests/:id/complete',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await updateMoneyRequest(id, {
        status: Status.COMPLETED,
      });

      res.json({
        success: true,
        message: 'Money request approved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/requests/:id/reject',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await updateMoneyRequest(id, {
        verified: false,
        status: Status.REJECTED,
      });

      res.json({
        success: true,
        message: 'Money request rejected successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/withdraw-requests/:id/approve',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      const result = await updateWithdrawRequest(id, {
        verified: true,
        status: Status.VERIFIED,
      });

      res.json({
        success: true,
        message: 'Withdraw request approved successfully',
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  '/withdraw-requests/:id/complete',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await updateWithdrawRequest(id, {
        status: Status.COMPLETED,
      });

      res.json({
        success: true,
        message: 'Withdraw request approved successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/withdraw-requests/:id/reject',
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await updateWithdrawRequest(id, {
        verified: false,
        status: Status.REJECTED,
      });

      res.json({
        success: true,
        message: 'Withdraw request rejected successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

router;

module.exports = router;
