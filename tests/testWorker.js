require('dotenv').config();
const mongoose = require('mongoose');
const pullDataFromHubspot = require('../worker');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function runTest() {
  await connectDB();
  
  try {
    await pullDataFromHubspot();
  } catch (error) {
    console.error('Error executing worker:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

runTest();