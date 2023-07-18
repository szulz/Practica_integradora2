const express = require('express');
const viewRouter = express.Router();
const ProductManagerMongoose = require('../services/product.service.js');
const productManagerMongoose = new ProductManagerMongoose;


viewRouter.get("/", async (req, res) => {
    let cartId = req.session.user.cart[0]
    let getAll = await productManagerMongoose.getAll(req.query, req.originalUrl);
    const { payload } = getAll
    let products = payload.map((payload) => {
        return { title: payload.title, description: payload.description, price: payload.price, _id: JSON.stringify(payload._id) }
    })
    return res.render("products", { products, getAll, cartId })
})

module.exports = viewRouter;