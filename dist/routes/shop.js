"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router
    .route("/cart")
    .get(shopController.getCart)
    .post(shopController.postCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);
exports.default = router;
//# sourceMappingURL=shop.js.map