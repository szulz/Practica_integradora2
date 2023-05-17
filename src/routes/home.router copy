const fs = require('fs');
const express = require('express')
const homeRouter = express.Router()
const ProductManager = require('../controllers/productManager.js')
const productManager = new ProductManager();

homeRouter.get("/", async (req, res) => {
    let products = await productManager.getProducts()
    return res.render("home", {products})
})


module.exports = homeRouter