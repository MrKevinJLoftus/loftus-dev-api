const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authError = new Error('Your username or password is incorrect.');

exports.userLogin = async (req, res) => {
  console.log(`${req.body.username} logging in`);
  const fetchedUser = await User.findOne({ username: req.body.username });
  if (!fetchedUser) {
    throw authError;
  }
  // found user
  const hashMatch = await bcrypt.compare(req.body.password, fetchedUser.password);
  if (!hashMatch) {
    throw authError;
  }
  // hashes match, correct password entered
  // time to generate user's JWT
  const token = jwt.sign(
    {
      username: fetchedUser.username, userId: fetchedUser._id
    },
    process.env.LOFTUS_DEV_JWT_KEY,
    {
      expiresIn: '4h'
    }
  );
  console.log('login successful!');
  res.status(200).json({
    token: token,
    expiresIn: 14400,
    userId: fetchedUser._id
  });
}

exports.fetchUserById = async (userId) => {
  const fetchedUser = await User.findOne({ _id: userId });
  if (!fetchedUser) {
    console.error('Error fetching user by ID!');
    throw new Error('');
  } else {
    const {firstName, lastName} = fetchedUser;
    return {
      firstName,
      lastName
    };
  }
}

exports.fetchUsersById = async (userIds) => {
  const fetchedUsers = await User.find({ _id: { $in: userIds } });
  if (!fetchedUsers) {
    console.error('Error fetching users by ID!');
    throw new Error('');
  } else {
    return fetchedUsers.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }));
  }
}

