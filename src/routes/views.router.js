const express = require('express');
const viewRouter = express.Router();
const ProductManagerMongoose = require('../services/product.service');
const productManagerMongoose = new ProductManagerMongoose;


viewRouter.get("/", async (req, res) => {
    let allProducts = await productManagerMongoose.getAll(req.query, req.originalUrl);
    let productos = allProducts.payload.docs
    return res.render("products", { productos })
})

module.exports = viewRouter;