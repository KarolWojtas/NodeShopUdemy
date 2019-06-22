import * as fs from 'fs'
import * as path from 'path'

export default class Product {
  constructor(public id: string, readonly title: string, public imageUrl: string = Product.DEFAULT_IMAGE, public description: string = 'no description', public price: number = 0) {
    if (!imageUrl) {
      this.imageUrl = Product.DEFAULT_IMAGE
    }
  }

  private static readonly DEFAULT_IMAGE: string = 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png'
  private static pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

  async save() {
    let products = await Product.fetchAll() as Product[]
    if (this.id) {
      const productIndex = products.findIndex(product => product.id === this.id)
      products[productIndex] = this
    } else {
      this.id = Math.floor(Math.random() * 100_000).toString();
      products.push(this)
    }
    return new Promise((resolve) => {
      fs.writeFile(Product.pathToFile, JSON.stringify(products), (err) => {
        resolve()
      })
    })

  }

  static async fetchAll() {
    return new Promise((resolve) => {
      fs.readFile(Product.pathToFile, (err, data) => {
        if (data && data.length > 0) {
          resolve(JSON.parse(data.toString('utf-8')))
        } else {
          resolve([])
        }
      })
    });
  }

  static async findbyId(productId) {
    let products = await Product.fetchAll() as Product[]
    return products.find(product => product.id === productId)
  }
}