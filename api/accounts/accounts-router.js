const express = require("express");
const Accounts = require("./accounts-model");
const router = express.Router();
const {
  checkAccountPayload,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", (req, res) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json([]);
    });
});

router.get("/:id", checkAccountId, (req, res) => {
  res.json(req.account);
});

router.post("/", checkAccountPayload, (req, res, next) => {
  Accounts.create({ name: req.body.name, budget: req.body.budget })
    .then((account) => {
      res.status(201).json(account);
    })
    .catch(next);
});

router.put("/:id", checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(() => {
      return Accounts.getById(req.params.id);
    })
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something failed, who knows?",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
