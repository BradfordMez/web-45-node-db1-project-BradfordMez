const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name !== "") {
    res.json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.json({ message: "budget of account must be a number" });
  } else if (budget !== Number) {
    res.json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res.json({ message: "budget of account is too large or too small" });
  } else {
    req.name = name.trim();
    req.budget = budget.trim();
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body;
  if ( )
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding account" });
  }
};
