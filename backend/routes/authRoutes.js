const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Sign up page");
});
router.post("/register", register);

router.get("/login", (req, res) => {
  res.send("Login page");
});
router.post("/login", login);

module.exports = router;
