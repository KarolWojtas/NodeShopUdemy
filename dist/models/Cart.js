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
class Cart {
    static addProduct(productId, productPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield Cart.updateCart(productId, productPrice);
            return new Promise((resolve, reject) => {
                fs.writeFile(this.pathToFile, JSON.stringify(cart), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(cart);
                    }
                });
            });
        });
    }
    static updateCart(productId, productPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                fs.readFile(this.pathToFile, (err, data) => {
                    let cart = { products: [], totalPrice: 0 };
                    if (!err) {
                        cart = JSON.parse(data.toString());
                        let existingIndex = cart.products.findIndex(product => product.id === productId);
                        const existingProduct = cart.products[existingIndex];
                        let updatedProduct = null;
                        if (existingProduct) {
                            updatedProduct = Object.assign({}, existingProduct);
                            updatedProduct.qty += 1;
                            cart.products = [...cart.products];
                            cart.products.splice(existingIndex, updatedProduct);
                        }
                        else {
                            updatedProduct = { id: productId, qty: 1 };
                            cart.products = [
                                ...cart.products,
                                updatedProduct
                            ];
                        }
                        cart.totalPrice = cart.totalPrice + productPrice;
                        resolve(cart);
                    }
                });
            });
        });
    }
}
Cart.pathToFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
exports.default = Cart;
//# sourceMappingURL=Cart.js.map