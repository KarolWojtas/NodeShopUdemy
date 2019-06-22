import Product from "../models/Product";
import { Request, Response } from "express";

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false
  })
}

exports.postAddProduct = (req, res) => {
  const { title, description, price, imageUrl } = req.body
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
    .then(() => {
      res.redirect('/');
    })
}

exports.getProducts = (req: Request, res) => {
  Product.fetchAll()
    .then((products: Product[]) => {
      res.render('admin/products', {
        docTitle: 'Admin Products',
        prods: products,
        path: '/admin/products',
        hasProducts: products.length > 0
      });
    })
}

exports.getEditProduct = (req: Request, res: Response) => {
  const { productId } = req.params
  Product.findbyId(productId)
    .then(product => {
      if (!product) {
        res.redirect('/')
      }
      res.render('admin/edit-product', {
        docTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        edit: true
      })
    })
}

exports.postEditProduct = (req: Request, res: Response) => {
  const { productId, title, description, price, imageUrl } = req.body
  const product = new Product(productId, title, imageUrl, description, price)
  product.save()
    .then(() => res.redirect('/'))
}