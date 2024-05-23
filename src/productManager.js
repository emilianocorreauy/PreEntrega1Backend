import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor() {
        this.path = 'products.json';
        this.products = [];
    }

    async addProduct({ title, description, price, thumbnail, code, stock, status, category }) {
        const id = uuidv4();
        const newProduct = { id, title, description, price, thumbnail, code, stock, status, category };

        this.products = await this.getProducts();
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));

        return newProduct;
    }

    async getProducts() {
        try {
            const response = await fs.readFile(this.path, 'utf8');
            return JSON.parse(response);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    }

    async updateProduct(id, data) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            console.log('Producto no encontrado');
        }
    }
}
