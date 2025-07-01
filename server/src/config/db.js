const mongoose = require('mongoose');
const { DATABASE } = require('./config.js')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE, {
      autoIndex: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;