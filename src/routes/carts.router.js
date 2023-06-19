const express = require('express');
const cartsRouter = express.Router();
const cartsModel = require("../DAO/models/carts.model.js");
const CartManagerMongoose = require("../services/carts.service.js");
const cartManagerMongoose = new CartManagerMongoose

//CREO NUEVO CARRO
cartsRouter.post('/', async (req, res) => {
    try {
        let cart = await cartManagerMongoose.createCart();
        res.status(200).send({
            status: 'success',
            msg: `New cart created`,
            id: cart._id,
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
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartData = await cartManagerMongoose.addToCart(req.params.cid, req.params.pid);
    res.status(200).send({
        status: 'success',
        msg: `A new product has been added to the cart with the id ${req.params.cid}`,
        data: cartData.cart
    });
});

// elimino del carrito el prod seleccionado (tambien le agregue que si tiene cantidad > 1 decremente hasta eliminar el prod)
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        let response = await cartManagerMongoose.deleteProdById(req.params.cid, req.params.pid);
        if (response) {
            return res.status(200).send({ msg: 'The desired product quantity has been decreased by 1', data: response })
        };
        res.status(200).send({ data: 'the product has been removed from the cart successfully!' });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

//elimino todos los prods del carrito
cartsRouter.delete('/:cid', async (req, res) => {
    await cartManagerMongoose.deleteCartProducts(req.params.cid)
    res.status(200).send({ msg: 'the cart has been successfully cleared' })
})

//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
cartsRouter.put('/:cid', async (req, res) => {
    try {
        let product = await cartManagerMongoose.updateCart(req.params.cid, req.body.products, req.body.quantity);
        res.send({ data: product })
    } catch (e) {
        res.status(400).json({ msg: 'something went wrong' })
    }
});

//PUT api/carts/:cid/products/:piddeberá poder actualizar 
//SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        let update = await cartManagerMongoose.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
        res.status(200).send({ msg: 'Product successfully updated', data: update })
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
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
