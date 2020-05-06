const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authError = new Error('Your username or password is incorrect.');

exports.userSignUp = (req, res, next) => {
    // create a new user and store it in the database
    console.log("creating new user");
    bcrypt.hash(req.body.password, 15)
      .then(hash => {
        const user = new User({
          username: req.body.username,
          password: hash
        });
        user.save()
          .then(result => {
            const token = jwt.sign({username: result.username, userId: result._id},
              process.env.JWT_KEY,
              { expiresIn: '4h' }
            );
            res.status(200).json({
              token: token,
              expiresIn: 3600,
              userId: result._id
            });
          })
          .catch(err => {
            console.log(err);
            next(err);
          });
      });
}

exports.userLogin = async (req, res, next) => {
  console.log(`${req.body.username} logging in`);
  const fetchedUser = await User.findOne({ username: req.body.username });
    if (!fetchedUser) {
        throw authError;
    }
    // found user
    const hashMatch = await bcrypt.compare(req.body.password, user.password);
    if (!hashMatch) {
    next(authError);
    }
    // hashes match, correct password entered
    // time to generate user's JWT
    const token = jwt.sign({username: fetchedUser.username, userId: fetchedUser._id, email: fetchedUser.email},
        process.env.JWT_KEY,
        { expiresIn: '4h' }
    );
    console.log('login successful!');
    res.status(200).json({
        token: token,
        expiresIn: 14400,
        userId: fetchedUser._id
    });
  }
