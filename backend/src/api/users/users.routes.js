const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const { findUserById, getUsers } = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/profile/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    delete user.password;
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/all', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
