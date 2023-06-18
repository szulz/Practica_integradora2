const express = require('express');
const viewRouter = express.Router();
const ProductManagerMongoose = require('../services/product.service');
const productManagerMongoose = new ProductManagerMongoose;


viewRouter.get("/", async (req, res) => {
    let getAll = await productManagerMongoose.getAll(req.query, req.originalUrl);
    const { payload } = getAll
    let products = payload.map((payload) => {
        return { title: payload.title, description: payload.description, price: payload.price }
    })
    return res.render("products", { products, getAll })
})

module.exports = viewRouter;