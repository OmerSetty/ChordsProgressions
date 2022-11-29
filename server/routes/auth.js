import express from 'express';
const router = express.Router();
import { getUsers } from '../handlers/usersHandler.js';
import passport from 'passport';
import User from '../models/user.js';
import { genPassword } from '../utils/passwordItils.js';

router.post('/login', passport.authenticate('local', { failureRedirect: 'login-failure', successRedirect: 'login-success' }));

router.get('/login-success', (req, res) => {
  res.status(200).send({user: req.user});
});

router.get('/login-failure', (req, res) => {
  res.status(403).send({success: false});
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    else {
      res.send({success: true});
    }
  });
});

router.get('/getAuthenticatedUser', (req, res, next) => {
  res.send({user: req.user});
})

router.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
  });

  newUser.save()
    .then((user) => {
      res.status(201).send({success: true});
    });

 });

router.get('/getAllUsers', getUsers);

export default router;