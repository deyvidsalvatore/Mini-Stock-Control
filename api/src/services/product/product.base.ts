export abstract class AbstractProductService {
    abstract listProducts(): Promise<any[]>;
    abstract createProduct({name, price, description, amount, category_id}): Promise<any>;
    abstract editProduct({name, amount, description, price, product_id, category_id}): Promise<any>;
    abstract deleteProduct(product_id: string): Promise<any>;
    abstract saleProduct({product_id, amount}): Promise<any>;
}