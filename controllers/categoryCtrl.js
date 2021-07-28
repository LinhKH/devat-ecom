const Category = require('../models/categoryModel');

const categoryCtrl = {
    getcategories: async (req, res) => {
        try {
            const categories = await Category.find();
            return res.json({categories});
        } catch (error) {
            return res.status(400).json({msg: error.message});
        }
    },
    createCategory: async (req, res) => {
        try {
            // if user have role == 1 ---> admin
            // only admin can create, delete and update category
            const { name } = req.body;
            const category = await Category.findOne({name});
            if (category) return res.status(400).json({msg: "This category already exists."});
            const newCategory = new Category({name});

            await newCategory.save();
            res.json({msg: 'Created Category.'});
        } catch (error) {
            return res.status(400).json({msg: error.message});
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.json({msg: "Deleted a Category"});
        } catch (error) {
            return res.status(400).json({msg: error.message});
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name});
            res.json({msg: "Updated a Category"});
        } catch (error) {
            return res.status(400).json({msg: error.message});
        }
    }
}

module.exports = categoryCtrl