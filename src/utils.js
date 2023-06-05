//@ts-check
// ------------MULTER-------------
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploader = multer({ storage });
const path = require("path")


//  --------------MONGOOSE--------------
const { connect } = require("mongoose")
const userModel = require('./DAO/models/users.model');
const productModel = require('./DAO/models/product.model');
const messagesModel = require('./DAO/models/messages.model');
const cartsModel = require('./DAO/models/carts.model');

async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://ezeszulz:test@coder.phqbv0m.mongodb.net/E-commerce?retryWrites=true&w=majority"
        );
        console.log('plug to mongo');
    } catch (e) {
        console.log(e);
        throw "can not connect"
    }
}

//--------------SOCKETS----------------

const { Server, Socket } = require('socket.io');
const ProductManager = require('./DAO/productManager.js');




const productManager = new ProductManager();

async function connectSocket(httpServer) {
    const socketServer = new Server(httpServer)

    socketServer.on('connection', async (socket) => {
        console.log('se abrio un socket en ' + socket.id);
        socket.on('product', async (product) => {
            let newProduct = await productManager.addProduct(product);
            socketServer.emit('productListed', newProduct);
        });

        socket.on('deleteProd', async data => {
            await productManager.deleteProduct(data);
            socketServer.emit('successfullDelete', JSON.parse(data));
            console.log('2');
        });
    });
}

// -----------EXPORTS-----------------

module.exports = {
    mongo: connectMongo,
    multer: uploader,
    socket: connectSocket
};