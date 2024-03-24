const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');

const {
  addBankAccount,
  removeBankAccount,
  getBankAccountsByUser,
  removeAdminBankAccount,
  getAdminBankAccounts,
  createAdminBankAccount,
} = require('./bank.services');

const router = express.Router();

router.post('/add-bank', isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.payload;

    const { bankName, accountHolderName, accountNumber, branchName, ifscCode } =
      req.body;

    const bankAccount = await addBankAccount(userId, {
      bankName,
      accountHolderName,
      accountNumber,
      branchName,
      ifscCode,
    });

    res.json({
      message: 'Bank account added successfully',
      bankAccount,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/remove-bank/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    await removeBankAccount(id);

    res.json({
      message: 'Bank account removed successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/bank-accounts', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.payload;

    const bankAccounts = await getBankAccountsByUser(id);

    res.json({
      success: true,
      data: bankAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/admin/add-bank', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { name, accountHolderName, accountNumber, branch, ifsc } = req.body;

    console.log('req.body', req.body);

    const bankAccount = await createAdminBankAccount({
      bankName: name,
      accountHolderName,
      accountNumber,
      branchName: branch,
      ifscCode: ifsc,
    });

    res.json({
      message: 'Bank account added successfully',
      bankAccount,
    });
  } catch (error) {
    console.log('error', error);
    // console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete(
  '/admin/remove-bank/:id',
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      await removeAdminBankAccount(id);

      res.json({
        message: 'Bank account removed successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

router.get('/admin/bank-accounts', async (req, res) => {
  try {
    const bankAccounts = await getAdminBankAccounts();
    isAuthenticated;
    res.json({
      success: true,
      data: bankAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
