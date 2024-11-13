// services/FileService.js
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class FileService {
    static saveFile(file) {
        const fileName = `${Date.now()}_${file.originalname}`;
        const filePath = path.join(__dirname, "../uploads", fileName);
        fs.writeFileSync(filePath, file.buffer);
        return fileName;
    }

    static deleteFile(fileName) {
        const filePath = path.join(__dirname, "../uploads", fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    static updateFile(oldFileName, newFile) {
        this.deleteFile(oldFileName);
        return this.saveFile(newFile);
    }
}

module.exports = FileService;
