import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images only (jpeg, jpg, png) are allowed!");
    }
  },
});
import {
  create,
  getAll,
  getById,
  update,
  deleteItem,
} from "../controllers/ProductControllerV1.js";

const router = express.Router();

router.post("/api/v1/product/", upload.single("image"), create);
router.get("/api/v1/products/", getAll);
router.get("/api/v1/product/:id", getById);
router.patch("/api/v1/product/:id", update);
router.delete("/api/v1/product/:id", deleteItem);

export default router;
