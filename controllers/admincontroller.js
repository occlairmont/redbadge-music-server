let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Admin = sequelize.import("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");

// Admin Signup

router.post("/register", function (req, res) {
  let adminModel = {
    email: req.body.admin.email,
    password: bcrypt.hashSync(req.body.admin.password, 5),
    isApproved: req.body.admin.isApproved,
  };
  Admin.create(adminModel)
    .then(function signupSuccess(admin) {
      let token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12,
      });
      let responseObject = {
        admin: admin,
        message: "Admin successfully created!",
        sessionToken: token,
      };
      res.json(responseObject);
    })
    .catch(function fail(err) {
      res.status(500).json({ error: err });
    });
});

// Admin Login

router.post("/login", function (req, res) {
  Admin.findOne({ where: { email: req.body.admin.email } })
    .then(function loginSuccess(admin) {
      if (admin) {
        bcrypt.compare(req.body.admin.password, admin.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 12,
            });
            res.status(200).json({
              admin: admin,
              message: "Admin successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "Admin does not exist." });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.get("/eventinfo", validateSession, function(req, res) {
  sequelize
    .query(
      `Select * from events inner join users on ${req.user.id} = events.owner`
      // Select * from events inner join users on users.id = events.owner
    )
    .then(([results, metadata]) => {
      res.json(results);
      // Results will be an empty array and metadata will contain the number of affected rows.
    })
    .catch(err => res.send(err));
  })


module.exports = router;
