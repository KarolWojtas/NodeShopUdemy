"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const Cart_1 = require("../models/Cart");
exports.getProducts = (req, res, next) => {
    Product_1.default.fetchAll().then((products) => {
        res.render("shop/product-list", {
            docTitle: "Shop",
            prods: products,
            path: "/products",
            hasProducts: products.length > 0
        });
    });
};
exports.getIndex = (req, res) => {
    Product_1.default.fetchAll().then((products) => {
        res.render("shop/index", {
            docTitle: "Shop",
            path: "/",
            prods: products,
            hasProducts: products.length > 0
        });
    });
};
exports.getCart = (req, res) => {
    res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart"
    });
};
exports.getCheckout = (req, res) => {
    res.render("shop/checkout", {
        docTitle: "Checkout",
        path: "/checkout"
    });
};
exports.getOrders = (req, res) => {
    res.render("shop/orders", {
        docTitle: "Orders",
        path: "/orders"
    });
};
exports.getProduct = (req, res) => {
    const { productId } = req.params;
    Product_1.default.findbyId(productId).then(product => {
        if (product) {
            res.render("shop/product-details", {
                product: product,
                docTitle: `Product: \"${product.title}\" Details`,
                path: "/products"
            });
        }
        else {
            res.redirect("/products");
        }
    });
};
exports.postCart = (req, res) => {
    const { productId } = req.body;
    Product_1.default.findbyId(productId)
        .then(product => {
        if (product) {
            return Cart_1.default.addProduct(product.id, product.price);
        }
        else {
            return Promise.resolve();
        }
    })
        .then(cart => {
        console.log(cart);
        res.redirect("/cart");
    }, console.log);
};
//# sourceMappingURL=shop.js.map