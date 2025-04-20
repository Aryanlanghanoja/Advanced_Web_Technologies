const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (data) => {
  const { email_id, username, phone_no, password } = data;

  const existing = await User.findOne({ where: { username } });
  if (existing) throw new Error('Username already exists');

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email_id, username, phone_no, password: hash });

  return newUser;
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('Invalid username');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return user;
};

module.exports = { registerUser, loginUser };
