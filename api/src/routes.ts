import { Router } from "express";
import WelcomeController from "./controllers/welcome.controller";
import UserController from "./controllers/user.controller";

const router = Router();

router.get("", new WelcomeController().handle);

/** User **/
router.post("/user", new UserController().createUser);
router.post("/auth", new UserController().authUser);

export default router;
