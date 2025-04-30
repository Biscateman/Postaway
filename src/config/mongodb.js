
import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/postaway'; // Default to local MongoDB if URI not provided
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};
