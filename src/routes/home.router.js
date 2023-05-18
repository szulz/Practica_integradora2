const fs = require('fs');
const express = require('express')
const homeRouter = express.Router()
const ProductManager = require('../controllers/productManager.js')
const productManager = new ProductManager();

homeRouter.get("/", async (req, res) => {
    let productos = await productManager.getProducts();
    return res.render("home", {productos})
})

homeRouter.post('/', async (req, res) => {
    console.log('acá estoy')
    let myBody = req.body
    res.send(myBody)
})

module.exports = homeRouter