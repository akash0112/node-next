const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username:String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['employee', 'manager'],
    default: 'employee',
  },
  departments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }],
  location:String,
  accessToken: String, 
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
