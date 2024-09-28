import express from 'express';
import productController from "../controllers/product.js";
import multer from 'multer'
import cloudinary from '../configs/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'BEARPO_PRODUCT',
    allowedFormats: ['jpg', 'png', 'jpeg']
})

const upload = multer({ storage });

const router = express.Router();
router.get("/", productController.getAllProduct)
router.post("/", upload.single('image'), productController.createProduct);
router.put("/:productId", upload.single('image'), productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.post("/check-product-quantity", productController.checkProductQuantity);
router.post("/search", productController.searchProductByName);

router.get("/detail/:id", productController.getProductById)

export default router;
