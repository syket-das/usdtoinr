const { db } = require('../../utils/db');

function addMoney(userId, data) {
  return db.addMoneyRequest.create({
    data: {
      userId,
      ...data,
    },
  });
}

function withdrawMoney(userId, data) {
  return db.withdrawMoneyRequest.create({
    data: {
      userId,
      ...data,
    },
  });
}

function getUserMoneyRequests(userId) {
  return db.addMoneyRequest.findMany({
    where: {
      userId,
    },
    include: {
      exchangeRate: true,
      user: true,
    },
  });
}

function getUserWithdrawRequests(userId) {
  return db.withdrawMoneyRequest.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      exchangeRate: true,
    },
  });
}

function getMoneyRequests() {
  return db.addMoneyRequest.findMany({
    include: {
      exchangeRate: true,
      user: true,
    },
  });
}

function getWithdrawRequests() {
  return db.withdrawMoneyRequest.findMany({
    include: {
      user: true,
      exchangeRate: true,
    },
  });
}

function getMoneyRequestById(id) {
  return db.addMoneyRequest.findUnique({
    where: {
      id,
    },
    include: {
      ExchangeRate: true,
      user: true,
    },
  });
}

function getWithdrawRequestById(id) {
  return db.withdrawMoneyRequest.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      exchangeRate: true,
    },
  });
}

function updateMoneyRequest(id, data) {
  return db.addMoneyRequest.update({
    where: {
      id,
    },
    data,
  });
}
function updateWithdrawRequest(id, data) {
  return db.withdrawMoneyRequest.update({
    where: {
      id,
    },
    data,
  });
}

module.exports = {
  addMoney,
  withdrawMoney,
  getUserMoneyRequests,
  getUserWithdrawRequests,
  getMoneyRequests,
  getWithdrawRequests,
  getMoneyRequestById,
  getWithdrawRequestById,
  updateMoneyRequest,
  updateWithdrawRequest,
};
