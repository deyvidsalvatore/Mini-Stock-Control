import { Request, Response } from "express";
import { CreateUserRequest } from "../models/user/create-user.request";
import UserService from "../services/user/user.service";
import { AuthUserRequest } from "../models/user/auth-user.request";

class UserController {
    userService: UserService = new UserService();

    createUser = async (request: Request, response: Response) => {
        const { name, email, password }: CreateUserRequest = request.body;
        try {
            const user = await this.userService.create({ name, email, password });
            response.status(201).json(user);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    };

    authUser = async (request: Request, response: Response) => {
        const { email, password }: AuthUserRequest = request.body;
        try {
            const auth = await this.userService.auth({ email, password });
            response.status(200).json(auth);
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    };
}

export default UserController;
