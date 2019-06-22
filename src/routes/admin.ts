const express = require('express');
const adminController = require('../controllers/admin')
const router = express.Router();

router.route('/add-product')
  .get(adminController.getAddProduct)
  .post(adminController.postAddProduct)

router.get('/products', adminController.getProducts)

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

export default router

