const Product = require('../models/productModel');

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" });

            const product = await Product.findOne({ product_id });
            if (product) return res.status(400).json({ msg: "This product already exists." });
            const newProduct = new Product({ 
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });

            await newProduct.save();
            res.json({ msg: 'Created Product.' });
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Product" });
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" });
            await Product.findOneAndUpdate({ _id: req.params.id }, { 
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });
            res.json({ msg: "Updated a Product" });
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = productCtrl