const { db } = require('../../utils/db');

function addExchangeRate(userId, data) {
  return db.exchangeRate.create({
    data: {
      userId,
      ...data,
    },
  });
}

function getExchangeRates() {
  return db.exchangeRate.findMany({
    include: {
      user: true,
    },
  });
}

module.exports = {
  addExchangeRate,
  getExchangeRates,
};
