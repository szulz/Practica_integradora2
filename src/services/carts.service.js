const cartsModel = require("../DAO/models/carts.model.js");
const productModel = require("../DAO/models/product.model");

class CartManagerMongoose {
    async createCart() {
        let newcart = new cartsModel();
        return newcart.save();
    }
    async getAll() {
        let allCarts = await cartsModel.find()
        return allCarts
    }

    async addToCart(cartId, productId) {
        let carrito = await cartsModel.findById(cartId)
        carrito.cart.push({ product: productId })
        carrito.save()
        let cart = await cartsModel.findById(cartId).populate('cart.product')
        // console.log(JSON.stringify(cart, null, 4));
        return cart;


    }
    async getById(id) {
        let contenido = await cartsModel.findById(id).populate('cart.product')
        return contenido
    }

}



module.exports = CartManagerMongoose;