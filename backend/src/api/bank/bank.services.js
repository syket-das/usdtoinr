const { db } = require('../../utils/db');

function addBankAccount(userId, data) {
  return db.bankAccount.create({
    data: {
      userId,
      ...data,
    },
  });
}

function removeBankAccount(id) {
  return db.bankAccount.delete({
    where: {
      id,
    },
  });
}

function getBankAccountsByUser(userId) {
  return db.bankAccount.findMany({
    where: {
      userId,
    },
  });
}

function createAdminBankAccount(data) {
  return db.adminBankAccount.create({
    data: {
      ...data,
    },
  });
}

function getAdminBankAccounts() {
  return db.adminBankAccount.findMany();
}

function getAdminBankAccountById(id) {
  return db.adminBankAccount.findUnique({
    where: {
      id,
    },
  });
}

function removeAdminBankAccount(id) {
  return db.adminBankAccount.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  addBankAccount,
  removeBankAccount,
  getBankAccountsByUser,
  createAdminBankAccount,
  getAdminBankAccounts,
  getAdminBankAccountById,
  removeAdminBankAccount,
};
