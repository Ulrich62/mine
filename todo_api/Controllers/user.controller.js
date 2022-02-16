const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
// fonction d'inscription
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        speciality: req.body.speciality,
        birthday: req.body.birthday,
        lastName: req.body.lastName,
        email: req.body.email,
        is_admin: req.body.is_admin,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created " }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// fonction de connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorect Password" });
          }
          return res.status(200).json({
            userId: user._id,
            is_admin: user.is_admin,
            token: jwt.sign({ userId: user._id }, "RAMDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction get un utilisateur
exports.getById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

//fonction get all users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

//fonction delete users
exports.deleteUser = (req, res, next) => {
  // return res.json(req.params.id);
  User.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      res.status(404).json({
        error: new Error("No such User!"),
      });
    } else {
      User.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    }
  });
};

//fonction update user
exports.updateUser = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: "User updated" }))
    .catch((error) => res.status(400).json({ error }));
};
