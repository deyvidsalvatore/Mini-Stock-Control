export abstract class AbstractCategoryService {
    abstract listCategories(): Promise<any[]>;
    abstract createCategory(name: string): Promise<any>;
    abstract updateCategory({ name, category_id }: { name: string; category_id: string }): Promise<any>;
    abstract deleteCategory(category_id: string): Promise<any>;
}
