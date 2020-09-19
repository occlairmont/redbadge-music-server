let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Users = sequelize.import("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Signup

router.post("/register", function (req, res) {
  let userModel = {
    email: req.body.users.email,
    password: bcrypt.hashSync(req.body.users.password, 5),
  };
  Users.create(userModel)
    .then(function signupSuccess(users) {
      let token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12,
      });
      let responseObject = {
        users: users,
        message: "User successfully created!",
        sessionToken: token,
      };
      res.json(responseObject);
    })
    .catch(function fail(err) {
      res.status(500).json({ error: err });
    });
});

// User Login

router.post("/login", function (req, res) {
  Users.findOne({ where: { email: req.body.users.email } })
    .then(function loginSuccess(users) {
      if (users) {
        bcrypt.compare(req.body.users.password, users.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: users.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            res.status(200).json({
              users: users,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
