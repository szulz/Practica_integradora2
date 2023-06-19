const express = require('express');
const CartManagerMongoose = require('../services/carts.service');
const cartManagerMongoose = new CartManagerMongoose
const cartsViewsRouter = express.Router();

cartsViewsRouter.get('/:cid', async (req, res) => {
    let cartCountent = await cartManagerMongoose.getById(req.params.cid);
    let products = cartCountent.cart.map((cart) => {
        return { title: cart.product.title, description: cart.product.description, price: cart.product.price }
    })
    console.log(products);
    return res.render("carts", { products })

})




module.exports = cartsViewsRouter