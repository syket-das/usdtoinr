const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },

    include: {
      addMoneyRequests: true,
      withdrawMoneyRequests: true,
    },
  });
}

function getUsers() {
  return db.user.findMany({
    include: {
      addMoneyRequests: true,
      withdrawMoneyRequests: true,
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  getUsers,
};
