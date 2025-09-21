import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.atdsbyq.mongodb.net/shopee_clone`;
    try {
        await mongoose.connect(URI);
        console.log('✅ Connected to MongoDB successfully');

    } catch (error) {
        console.error('❌ MongoDB connection error: ', error.message);
        process.exit(1);
    }
}

export default connectDB;