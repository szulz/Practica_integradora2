const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const { Server, Socket } = require('socket.io')
const homeRouter = require('./routes/home.router.js')

//
const ProductManager = require('./controllers/productManager.js')
const productManager = new ProductManager();
//

const path = require('path')

const app = express();
const port = 8080;

//HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//RUTAS

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/home', homeRouter);


const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
  //console.log('se abrio un socket en ' + socket.id)

    socket.on('getProducts', async (data)=>{ 
      let products = await productManager.getProducts();
      socket.emit('allProducts', products)

    });

})





