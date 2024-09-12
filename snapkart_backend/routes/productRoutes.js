import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getProductsByCategoryController,
  getSingleProductController,
  getTopProductsController,
  productReviewController,
  searchProductsController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//rroutes
// ============== PRODUCT ROUTES ==================

// GET ALL PRODUCTS
router.get("/get-all", getAllProductsController);
// GET ALL PRODUCTS From given category
router.get("/category/:categoryName", getProductsByCategoryController);

// GET TOP PRODUCTS
router.get("/top", getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);
// search product 
router.get('/search/:key', searchProductsController);

// CREATE PRODUCT
router.post("/create", singleUpload, createProductController);

// UPDATE PRODUCT
router.put("/:id", isAuth, isAdmin, updateProductController);

// UPDATE PRODUCT IMAGE
router.put(
  "/image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController
);

// delete product image
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);

// delete product
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);

// ====================================================================

export default router;
