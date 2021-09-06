const Account = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget ) {
    next({status: 400, message : "name and budget are required"})
  }
  if (typeof name !== "string" ) {
    next({message: "name of account must be a string"})
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    res.json({ message: "budget of account must be a number" });
  }
  if (typeof budget !== 'number') {
    res.json({ message: "budget of account must be a number" });
  }
  if (budget < 0 || budget > 1000000) {
    res.json({ message: "budget of account is too large or too small" });
  }
  req.name = name.trim();
  next();
};

exports.checkAccountNameUnique = (req, res, next) => {};

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
