//@ts-check
const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')

const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const homeRouter = require('./routes/home.router.js')
const usersRouter = require('./routes/users.router.js')

const { Server, Socket } = require('socket.io')
const ProductManager = require('./controllers/productManager.js')
const productManager = new ProductManager();
const myModules = require('./utils.js')
const path = require('path')
const app = express();
const port = 8080;

// --------CONNECT TO MONGO--------
myModules.mongo()

// --------HANDLEBARS--------
app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// --------RUTAS--------

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);

// --------SOCKETS--------

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

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





