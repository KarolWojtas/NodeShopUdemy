import Product from "../models/Product";
import { Request, Response } from "express";
import Cart from "../models/Cart";

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products: Product[]) => {
    res.render("shop/product-list", {
      docTitle: "Shop",
      prods: products,
      path: "/products",
      hasProducts: products.length > 0
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll().then((products: Product[]) => {
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
exports.getProduct = (req: Request, res: Response) => {
  const { productId } = req.params;
  Product.findbyId(productId).then(product => {
    if (product) {
      res.render("shop/product-details", {
        product: product,
        docTitle: `Product: \"${product.title}\" Details`,
        path: "/products"
      });
    } else {
      res.redirect("/products");
    }
  });
};

exports.postCart = (req: Request, res: Response) => {
  const { productId } = req.body;
  Product.findbyId(productId)
    .then(product => {
      if (product) {
        return Cart.addProduct(product.id, product.price)
      } else {
        return Promise.resolve()
      }
    })
    .then(cart => {
      res.redirect("/cart");
    }, console.log)
};
