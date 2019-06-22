"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Product {
    constructor(title, imageUrl = Product.DEFAULT_IMAGE, description = 'no description', price = 0) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        if (!imageUrl) {
            this.imageUrl = Product.DEFAULT_IMAGE;
        }
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = Math.floor(Math.random() * 100000).toString();
            let products = yield Product.fetchAll();
            products.push(this);
            return new Promise((resolve) => {
                fs.writeFile(Product.pathToFile, JSON.stringify(products), (err) => {
                    resolve();
                });
            });
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                fs.readFile(Product.pathToFile, (err, data) => {
                    if (data && data.length > 0) {
                        resolve(JSON.parse(data.toString('utf-8')));
                    }
                    else {
                        resolve([]);
                    }
                });
            });
        });
    }
    static findbyId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield Product.fetchAll();
            return products.find(product => product.id === productId);
        });
    }
}
Product.DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png';
Product.pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
exports.default = Product;
//# sourceMappingURL=Product.js.map