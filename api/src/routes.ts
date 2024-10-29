import { Router } from "express";
import WelcomeController from "./controllers/welcome.controller";
import UserController from "./controllers/user.controller";
import { isAuthenticated } from "./middlewares/auth.middleware";
import CategoryController from "./controllers/category.controller";

const router = Router();
const welcomeController: WelcomeController = new WelcomeController();
const userController: UserController = new UserController();
const categoryController: CategoryController = new CategoryController();

router.get("", welcomeController.handle);

/** User **/
router.post("/user", userController.createUser);
router.post("/auth", userController.authUser);

/** Category **/
router.get("/category", isAuthenticated, categoryController.listCategories);
router.post("/category", isAuthenticated, categoryController.createCategory);
router.put("/category", isAuthenticated, categoryController.updateCategory);
router.delete("/category", isAuthenticated, categoryController.deleteCategory);

export default router;
