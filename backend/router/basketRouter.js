import express from "express";
const router = express.Router();

import {
    deleteBasket,
    getBasket,
    postBasket,
} from "../controllers/basketController.js";

router.route("/").get(getBasket).post(postBasket);

router.route("/:id").delete(deleteBasket);

export default router;
