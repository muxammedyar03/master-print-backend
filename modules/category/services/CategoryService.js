const Category = require("../models/CategoryModel");
const FileService = require("./FileService");

class CategoryService {
    async create(data, file) {
        const imageUrl = file ? FileService.saveFile(file) : null;
        const category = new Category({ ...data, imageUrl });
        return await category.save();
    }

    async update(id, data, file) {
        const category = await Category.findById(id);
        if (!category) throw new Error("Category not found");

        if (file) {
            FileService.deleteFile(category.imageUrl);
            category.imageUrl = FileService.saveFile(file);
        }

        Object.assign(category, data);
        return await category.save();
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
            if (category.imageUrl) FileService.deleteFile(category.imageUrl);
        });
        return await Category.deleteMany({});
    }
}

module.exports = new CategoryService();
