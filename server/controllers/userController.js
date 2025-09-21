import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Register
const registerUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({
                message: "Vui lòng điền đầy đủ thông tin"
            });
        };

        // Kiểm tra Email đã tồn tại hay chưa
        let checkEmail = await User.findOne({
            email: req.body.userEmail,
        });

        if(checkEmail){
            return res.status(400).json({
                message: "Email đã tồn tại trong hệ thống"
            });
        };

        // Hash password trước khi lưu và Mongo
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // Lưu dữ liệu User vào Mongo
        const newUser = new User({
            email: userEmail,
            password: hashedPassword
        })

        await newUser.save();

        // JWT
        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
        }, process.env.JWT, { expiresIn: "1h" });

        // Trả về client
        res.status(201).json({
            message: "Đăng ký thành công",
            token,
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

// Login
const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Kiểm tra thông tin
        if (!userEmail || !userPassword) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        };

        // Kiểm tra User tồn tại chưa
        let existUser = await User.findOne({
            email: userEmail,
        });

        if (!existUser) {
            return res.status(400).json({
                message: "Email không tồn tại"
            });
        };

        // Kiểm tra password
        const validPassword = bcrypt.compare(userPassword, existUser.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Sai mật khẩu"
            })
        };

        // Tạo JWT
        const token = jwt.sign(
            { id: existUser._id, email: existUser.email },
            process.env.JWT,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: {
                id: existUser._id,
                email: existUser.email,
            }
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

export { registerUser, loginUser }