const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = 'mongodb://localhost:27017/manager_employee';

    await mongoose.connect(MONGODB_URI);

    console.log('mongoose connected');
  } catch (error) {
    console.error('Error While connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
