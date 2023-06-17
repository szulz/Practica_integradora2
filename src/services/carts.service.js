
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
    async deleteProdById(cartId, productId) {
        try {
            let targetCart = await cartsModel.findById(cartId)
            const targetProduct = targetCart.cart.find((item) => item.product == productId);
            if (targetProduct.quantity > 1) {
                targetProduct.quantity -= 1
                return await targetCart.save();
            }
            await targetCart.cart.pull({ product: targetProduct.product })
            await targetCart.save()
            return
        } catch (e) {
            throw new Error(e.message)
        }
    }
    async deleteCartProducts(cartId) {
        let cartToEmpty = await cartsModel.findById(cartId);
        cartToEmpty.cart = []
        await cartToEmpty.save()
        return
    }
    async updateCart(cartId, products) {
        
    }
    async updateProductQuantity(cartId, productId, quantity) {
        let targetCart = await cartsModel.findById(cartId);
        let targetProduct = targetCart.cart.find((item) => item.product == productId)
        targetProduct.quantity = JSON.parse(quantity)
        if (targetProduct.quantity === 0) {
            throw new Error('please type a number greater than 0')
        }
        return await targetCart.save()
    }
}



module.exports = CartManagerMongoose;