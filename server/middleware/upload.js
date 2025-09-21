import multer from 'multer'
import path from 'path'

// Setup storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // tên file
    },
});

const upload = multer({ storage });

export default upload;