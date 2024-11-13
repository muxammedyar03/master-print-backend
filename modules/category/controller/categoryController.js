const CategoryService = require("../services/CategoryService");

class CategoryController {
    async create(req, res) {
        try {
            const category = await CategoryService.create(req.body, req.file);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const category = await CategoryService.update(req.params.id, req.body, req.file);
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const category = await CategoryService.getOne(req.params.id);
            res.json(category);
        } catch (error) {
            res.status(404).json({ error: "Category not found" });
        }
    }

    async getMany(req, res) {
        try {
            const categories = await CategoryService.getMany(req.query);
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteOne(req, res) {
        try {
            const category = await CategoryService.deleteOne(req.params.id);
            res.json({ message: "Category deleted", category });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMany(req, res) {
        try {
            await CategoryService.deleteMany(req.query);
            res.json({ message: "Categories deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAll(req, res) {
        try {
            await CategoryService.deleteAll();
            res.json({ message: "All categories deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();
