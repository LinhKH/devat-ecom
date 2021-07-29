const Product = require('../models/productModel');

// Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString }
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        console.log({queryStr});

        this.query.find(JSON.parse(queryStr));

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const objApi = new APIfeatures(Product.find(), req.query);
            const productsTotal = await objApi.query;
            const total = productsTotal.length;
            const features = objApi.filtering().sorting().paginating();
            const products = await features.query;
            return res.json({
                status: 'success',
                total,
                result: products.length,
                products: products
            });
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