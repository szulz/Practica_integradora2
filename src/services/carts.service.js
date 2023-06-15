//@ts-check
const cartsModel = require("../DAO/models/carts.model.js");
const productModel = require("../DAO/models/product.model");

class CartManagerMongoose {
    async createCart() {
        try {
            let newcart = new cartsModel();
            return newcart.save();
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async getAll() {
        let allCarts = await cartsModel.find()
        return allCarts
    }

    async addToCart(cartId, productId) {
        try {
            let carrito = await cartsModel.findById(cartId)
            if (!carrito) {
                throw new Error('no hay carrito con ese id')
            };
            const existingProduct = carrito.cart.find((item) => item.product == productId);
            if (existingProduct) {
                // @ts-ignore
                existingProduct.quantity += 1;
            } else {
                carrito.cart.push({ product: productId, quantity: 1 });
            }
            await carrito.save();
            return carrito;
        } catch (e) {
            throw new Error('error en addtocart')
        }

    }
    async getById(id) {
        let contenido = await cartsModel.findById(id).populate('cart.product')
        return contenido;
    }

}



module.exports = CartManagerMongoose;