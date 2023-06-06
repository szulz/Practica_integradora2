const express = require('express');
const cartsRouter = express.Router();
const cartsModel = require("../DAO/models/carts.model.js");
const CartManagerMongoose = require("../services/carts.service.js");
const cartManagerMongoose = new CartManagerMongoose

cartsRouter.post('/', async (req, res) => {
    try {
        let cart = await cartManagerMongoose.createCart();
        res.status(200).send({
            status: 'success',
            msg: `New cart created`,
            data: cart
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//MUESTRA PRODUCTOS EN EL CARRO POR ID DE CARRO 
cartsRouter.get('/:cid', async (req, res) => {
    let cartCountent = await cartManagerMongoose.getById(req.params.cid);
    res.send({
        msg: 'here is a list with all the products on this cart',
        data: cartCountent
    });
})


//PASO ID DEL CARRO Y PRODUCTO CON SU ID
cartsRouter.post('/:cid/:pid', async (req, res) => {
    let cartData = await cartManagerMongoose.addToCart(req.params.cid, req.params.pid);
    res.send({
        msg: 'The following cart has been found',
        data: cartData
    });
})

//x si no ingreso ruta
cartsRouter.get('/', async (req, res) => {
    try {
        res.send({
            msg: 'Heres a list with all the carts',
            data: await cartManagerMongoose.getAll()
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = cartsRouter;
