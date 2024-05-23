import { Router } from 'express';
import { productManager } from '../index.js';
import { error } from 'console';

const productsRouter = Router()

// http://localhost:8080/api/products

productsRouter.get('/', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts()

        if(limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)

    } catch (error) {
        console.log(error);
        res.send('ERROR AL RECIBIR LOS PRODUCTOS')
    }
})

// http://localhost:8080/api/products/...
productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try{
        const products = productManager.getProductsById(pid)
        res.json(products) 
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})

// http://localhost:8080/api/products/
productsRouter.post('/', async (req, res) =>{
    try {
        const { title, description, price, thumbnail, code, stock, status, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`ERROR Al AGREGAR PRODUCTO`)
    }
})

// http://localhost:8080/api/products/...
productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status, category} = req.body;
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock, status, category })
        res.json(response) 
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL EDITAR PRODUCTO ID ${pid}`)
    }
})

productsRouter.delete('/:pid'), async (req, res) =>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(id)
        res.send('PRODUCTO ELIMINADO')
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL ELIMINAR PRODUCTO ID ${pid}`);
    }
}

export {productsRouter}