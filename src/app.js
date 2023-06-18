//@ts-check
const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')

const productsRouter = require('./routes/product.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js')
/*
const homeRouter = require('./routes/home.router.js')
const usersRouter = require('./routes/users.router.js')*/

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
app.use('/products', viewsRouter);
/*
app.use('/home', homeRouter);
app.use('/users', usersRouter);*/

// --------SOCKETS--------

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

myModules.socket(httpServer)





