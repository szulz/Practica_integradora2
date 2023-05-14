const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const { Server, Socket } = require('socket.io')
const RTRouter = require('./routes/realtime.router.js')
const homeRouter = require('./routes/home.router.js')


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
app.use('/api/home', homeRouter);
app.use('/real', RTRouter)


const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

const socketServer = new Server(httpServer)
socketServer.on('connection', (socket) => {
  console.log('se abrio un socket en ' + socket.id)
  setInterval(() => {
    socket.emit('msg_to_front_one', { msg: 'mensaje 1', status: 1 })
  }, 1500);
})

socketServer.on('connection', (socket) => {
  socket.on('msg_to_back', (data) => {
    setInterval(() => {
      console.log(JSON.stringify(data))
    }, 1500);
  })
})

socketServer.on('connection', (socket) => {
  setInterval(() => {
    socket.emit('msg_to_front_two', {msg: 'mensaje 2', status: 2})
  }, 1500);
})


