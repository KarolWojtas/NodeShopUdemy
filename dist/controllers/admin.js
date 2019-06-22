"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product'
    });
};
exports.postAddProduct = (req, res) => {
    const { title, description, price, imageUrl } = req.body;
    const product = new Product_1.default(title, imageUrl, description, price);
    product.save()
        .then(() => {
        res.redirect('/');
    });
};
exports.getProducts = (req, res) => {
    Product_1.default.fetchAll()
        .then((products) => {
        res.render('admin/products', {
            docTitle: 'Admin Products',
            prods: products,
            path: '/admin/products',
            hasProducts: products.length > 0
        });
    });
};
exports.getEditProduct = (req, res) => {
    res.render('admin/edit-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit-products'
    });
};
//# sourceMappingURL=admin.js.map