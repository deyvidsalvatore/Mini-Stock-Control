import { Request, Response } from "express";
import CategoryService from "../services/category/category.service";

class CategoryController {
    private categoryService: CategoryService = new CategoryService();

    listCategories = async(request: Request, response: Response) => {
        const categories = await this.categoryService.listCategories();
        response.status(200).json(categories);
    }

    createCategory = async(request: Request, response: Response) => {
        const { name } = request.body;
        try {
            const category = await this.categoryService.createCategory(name);
            response.status(201).json(category);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }

    updateCategory = async(request: Request, response: Response) => {
        const { name } = request.body;
        const category_id = request.query.category_id as string;
        const categoryEdited = this.categoryService.updateCategory({name, category_id});
        response.status(200).json(categoryEdited);
    }

    deleteCategory = async(request: Request, response: Response) => {
        const category_id = request.query.category_id as string;
        this.categoryService.deleteCategory(category_id);
        response.status(200).json("Specified Category was deleted");
    }
}

export default CategoryController;