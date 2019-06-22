import * as fs from 'fs'
import * as path from 'path'

export default class Cart {
  private static pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

  static async addProduct(productId, productPrice) {
    const cart = await Cart.updateCart(productId, productPrice)
    return new Promise((resolve, reject) => {
      fs.writeFile(this.pathToFile, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(cart)
        }
      })
    })
  }

  private static async updateCart(productId, productPrice) {
    let cart = await this.getCart() as any
    return new Promise(resolve => {
      let existingIndex = cart.products.findIndex(product => product.id === productId)
      let existingProduct = cart.products[existingIndex]
      let updatedProduct = null

      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty += 1
        cart.products = [...cart.products]
        cart.products[existingIndex] = updatedProduct
      } else {
        updatedProduct = { id: productId, qty: 1 }
        cart.products = [
          ...cart.products,
          updatedProduct
        ]
      }
      cart.totalPrice = cart.totalPrice + parseFloat(productPrice)
      resolve(cart)
    })
  }

  static async getCart() {
    return new Promise(resolve => {
      fs.readFile(this.pathToFile, (err, data) => {
        if (!err && data && data.length > 0) {
          resolve(JSON.parse(data.toString()))
        } else {
          resolve({ products: [], totalPrice: 0 })
        }
      })
    })
  }
}
