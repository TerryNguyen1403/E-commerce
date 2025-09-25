import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (req, res, next) => {
    let token = req.header('token');
    
    // if (!token) {
    //     const authHeader = req.header('authorization') || req.header('Authorization');
    //     if (authHeader && authHeader.startsWith('Bearer ')) {
    //         token = authHeader.slice(7);
    //     }
    // }

    if (!token) {
        return res.status(401).json({
            message: "No token provided!"
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();

    } catch (error) {
        if (error && error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token!' });
    };
}