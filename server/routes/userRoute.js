import express from 'express'
import 'dotenv/config'

import {
    registerUser,
    loginUser
} from '../controllers/userController.js'

const PORT = process.env.PORT;
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;