const express = require('express');
const path = require('path');
const productsRouter = require('./src/routes/products.router');
const cartsRouter = require('./src/routes/carts.router');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos codificados en URL
app.use(express.urlencoded({ extended: true }));

// Definición de las rutas
app.use('/', productsRouter);
app.use('/', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});