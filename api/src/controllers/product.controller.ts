import { Request, Response } from 'express';
import { CreateProductRequest } from '../models/product/create-product.request';
import { EditProductRequest } from '../models/product/edit-product.request';
import { SaleProductRequest } from '../models/product/sale-product.request';
import ProductService from '../services/product/product.service';

class ProductController {
    productService: ProductService = new ProductService();

    listProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.listProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error listing products", error: error.message });
        }
    };

    createProduct = async (req: Request<{}, {}, CreateProductRequest>, res: Response): Promise<void> => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: "Error creating product", error: error.message });
        }
    };

    editProduct = async (req: Request<{}, {}, EditProductRequest>, res: Response): Promise<void> => {
        try {
            const product = await this.productService.editProduct(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: "Error editing product", error: error.message });
        }
    };

    deleteProduct = async (req: Request<{ product_id: string }>, res: Response): Promise<void> => {
        try {
            const product_id = req.query.product_id as string;
            const deletedProduct = await this.productService.deleteProduct(product_id);
            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(400).json({ message: "Error deleting product", error: error.message });
        }
    };

    saleProduct = async (req: Request<{}, {}, SaleProductRequest>, res: Response): Promise<void> => {
        try {
            const saleResult = await this.productService.saleProduct(req.body);
            res.status(200).json(saleResult);
        } catch (error) {
            res.status(400).json({ message: "Error processing sale", error: error.message });
        }
    };
}

export default ProductController;
