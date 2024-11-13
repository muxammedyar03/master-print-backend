const express = require("express");
const multer = require("multer");
const CategoryController = require("../controller/categoryController");

const router = express.Router();
const upload = multer();

// Category yo‘nalishlari
router.post("/", upload.single("file"), CategoryController.create);
router.put("/:id", upload.single("file"), CategoryController.update);
router.get("/:id", CategoryController.getOne);
router.get("/", CategoryController.getMany);
router.delete("/:id", CategoryController.deleteOne);
router.delete("/", CategoryController.deleteMany);
router.delete("/all", CategoryController.deleteAll);

module.exports = router;
