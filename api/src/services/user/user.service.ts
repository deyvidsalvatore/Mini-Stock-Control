import { CreateUserRequest } from "../../models/user/create-user.request";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { AuthUserRequest } from "../../models/user/auth-user.request";
import { BaseUserService } from "./user.base";

class UserService extends BaseUserService {
    async create({ name, email, password }: CreateUserRequest) {
        await this.validateEmail(email);

        const userAlreadyExists = await this.userExists(email);
        if (userAlreadyExists) {
            throw new Error("Email already exists");
        }

        const passwordHash = await this.hashPassword(password);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    }

    async auth({ email, password }: AuthUserRequest) {
        await this.validateEmail(email);
        if (!password) {
            throw new Error("Password needs to be provided!");
        }

        const user = await this.userExists(email);
        if (!user) {
            throw new Error("Wrong username/password");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Wrong password");
        }

        const token = this.generateToken(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    }

    private generateToken(user: any) {
        return sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: "30d",
            }
        );
    }
}

export default UserService;
