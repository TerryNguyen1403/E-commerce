import Product from '../models/Product.js';

// Thêm sản phẩm
export const addProduct = async (req, res) => {
    try {
        const { name, platform, image, thumb, new_price, old_price, description, isFeatured } = req.body;

        const newProduct = new Product({
            name: name,
            platform: platform,
            image: image,
            thumb: thumb,
            new_price: new_price,
            old_price: old_price,
            description: description,
            isFeatured: isFeatured
        });

        await newProduct.save();
        res.status(200).json({ message: 'Thêm sản phẩm thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
}

// Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});

        res.json({
            message: "Lấy sản phẩm thành công",
            allProducts
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Lấy ra sản phẩm nổi bật
export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });

        res.json({
            message: "Lấy ra sản phẩm nổi bật thành công",
            featuredProducts
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Lấy ra sản phẩm mới
export const getNewProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        const newProducts = products.slice(-8);

        res.json({
            message: "Lấy sản phẩm mới nhất thành công",
            newProducts
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

// Lấy ra sản phẩm cùng platform
export const getProductByPlatform = async (req, res) => {
    try {
        const { _id, platform } = req.params;
        const productByPlatform = await Product.find({
            _id: { $ne: _id},
            platform: platform
        })

        res.json({
            message: `Lấy sản phẩm theo ${platform} thành công`,
            productByPlatform
        })
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

// Upload ảnh
export const uploadImages = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Không có ảnh nào được upload" });
    }

    const imgUrls = req.files.map(file =>
        `http://localhost:4000/uploads/${file.filename}`
    );
    
    res.json({ img_urls: imgUrls });
};