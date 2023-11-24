const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SignUpUserService = async (username,email, password, role, location) => {
  try {
    const newUser = new User({ username,email, password, role, location });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const LoginUserService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Password not Match');
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    user.accessToken = token;
    await user.save();

    return { user };
  } catch (error) {
    console.log(error);
    throw new Error('Error in login');
  }
};

module.exports = {
  SignUpUserService,
  LoginUserService,
};
