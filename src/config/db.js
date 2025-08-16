import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/Tasksdb'; // MongoDB connection URL

async function connectToMongodb(){
  try {
    await mongoose.connect(url);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.log('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

export { connectToMongodb };

//async funtion wherever called, return a promise