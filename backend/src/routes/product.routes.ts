import { Router } from "express";
import { authMiddleware} from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";
import { addProduct,deleteProduct, updateProduct, getProductById, getAllProducts } from "../controllers/product.controller";

const router = Router();


// Require authentication for all product access
router.get("/", authMiddleware, getAllProducts);        // ✅ Authenticated users only
router.get("/:id", authMiddleware, getProductById);     // ✅ Authenticated users only

// Admin routes
router.put("/:id", authMiddleware, isAdminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteProduct);
router.post("/", authMiddleware, isAdminMiddleware, addProduct);




export default router;
