import { EditCategoryRequest } from "../../models/category/edit-category.request";
import prismaClient from "../../prisma";
import { AbstractCategoryService } from "./category.base";

class CategoryService extends AbstractCategoryService {
    async listCategories() {
        return await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }

    async createCategory(name: string) {
        this.validateName(name);
        return await prismaClient.category.create({
            data: { name },
            select: { id: true, name: true },
        });
    }

    async updateCategory({ name, category_id }: EditCategoryRequest) {
        this.validateUpdateInput(name, category_id);
        return await prismaClient.category.update({
            where: { id: category_id },
            data: { name },
        });
    }

    async deleteCategory(category_id: string) {
        if (!category_id) {
            throw new Error("Invalid category ID");
        }

        const category = await prismaClient.category.findFirst({
            where: { id: category_id },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        return await prismaClient.category.delete({
            where: { id: category_id },
        });
    }

    private validateName(name: string) {
        if (!name || name.trim() === "") {
            throw new Error("Invalid name");
        }
    }

    private validateUpdateInput(name: string, category_id: string) {
        if (!category_id || !name || name.trim() === "") {
            throw new Error("Invalid arguments to edit category!");
        }
    }
}

export default CategoryService;
