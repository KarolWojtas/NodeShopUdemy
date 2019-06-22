"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
router.route('/add-product')
    .get(adminController.getAddProduct)
    .post(adminController.postAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:id', adminController.getEditProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map