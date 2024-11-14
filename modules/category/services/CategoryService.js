const Category = require('../models/CategoryModel');
const { FileService } = require('./FileService');

class CategoryService {
    async create(data, file) {
        try {
            const existingCategory = await Category.findOne({ name: data.name });
            if (existingCategory) {
                throw new Error("Category with this name already exists.");
            }
            
            const image = file ? FileService.saveFile(file) : null;

            const category = new Category({...data, image});
            return await category.save();
        } catch (error) {
            throw error;
        }
    }
    

    async update(id, data, file) {
        const category = await Category.findById(id);
        if (!category) throw new Error("Category not found");

        if (file) {
            FileService.deleteFile(category.image);
            console.log("File Deleted successfully and updated successfully");
            category.image = FileService.saveFile(file);
        }
        Object.assign(category, data);
        return await category.save();
    }
    async getAll(){
        return await Category.find({});
    }
    async getOne(id) {
        return await Category.findById(id);
    }

    async getMany(filter = {}) {
        return await Category.find(filter);
    }

    async deleteOne(id) {
        const category = await Category.findByIdAndDelete(id);
        if (category && category.imageUrl) {
            FileService.deleteFile(category.imageUrl);
        }
        return category;
    }

    async deleteMany(filter = {}) {
        const categories = await Category.find(filter);
        categories.forEach((category) => {
            if (category.imageUrl) FileService.deleteFile(category.imageUrl);
        });
        return await Category.deleteMany(filter);
    }

    async deleteAll() {
        const categories = await Category.find();
        categories.forEach((category) => {
            if (category.image) FileService.deleteFile(category.image);
        });
        return await Category.deleteMany({});
    }
}

module.exports = new CategoryService();
