import app from './app';
import mongoose from 'mongoose';

// Start the server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });