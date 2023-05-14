const fs = require('fs');
const express = require('express')
const RTRouter = express.Router()
const ProductManager = require('../controllers/productManager.js')
const productManager = new ProductManager();


RTRouter.get("/", async (req, res) => {
    let products = await productManager.getProducts()
    return res.render("home", {products})
})


module.exports = RTRouter