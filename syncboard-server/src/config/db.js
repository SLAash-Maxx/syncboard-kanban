const mongoose = require('mongoose');
const config = require('./index');

async function connectDB() {
  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is not set - copy .env.example to .env and fill it in');
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  await mongoose.connect(config.mongodbUri);
}

module.exports = connectDB;
