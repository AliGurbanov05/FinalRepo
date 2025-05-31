import express from "express";
const router = express.Router();

import {
    deleteProducts,
    getProducts,
    postProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(postProducts);

router.route("/:id").delete(deleteProducts);

export default router;
