import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router();

// http://localhost:8080/api/products
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit, 10));
            return res.json(limitedProducts);
        }
        return res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).send('ERROR AL RECIBIR LOS PRODUCTOS');
    }
});

// http://localhost:8080/api/products/:pid
productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send(`Producto con ID ${pid} no encontrado`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`ERROR AL RECIBIR EL PRODUCTO CON ID ${pid}`);
    }
});

// http://localhost:8080/api/products
productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('ERROR AL AGREGAR PRODUCTO');
    }
});

// http://localhost:8080/api/products/:pid
productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category });
        if (response) {
            res.json(response);
        } else {
            res.status(404).send(`Producto con ID ${pid} no encontrado`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`ERROR AL EDITAR PRODUCTO ID ${pid}`);
    }
});

// http://localhost:8080/api/products/:pid
productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deleted = await productManager.deleteProduct(pid);
        if (deleted) {
            res.send('PRODUCTO ELIMINADO');
        } else {
            res.status(404).send(`Producto con ID ${pid} no encontrado`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`ERROR AL ELIMINAR PRODUCTO ID ${pid}`);
    }
});

export { productsRouter };
