import express from "express";
import cors from 'cors';
import 'dotenv/config';

// Import connection
import connectDB from './DB/connect.js';

// Import routes
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js'

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);

// Cho phép truy cập file trong /uploads
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT;
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server đang chạy ở port ${port}`);
    } else {
        console.log('Lỗi: ', error);
    };
});