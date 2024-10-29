import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

export abstract class BaseUserService {
    protected async validateEmail(email: string) {
        if (!email) {
            throw new Error("Email is required");
        }
    }

    protected async userExists(email: string) {
        return await prismaClient.user.findFirst({
            where: { email },
        });
    }

    protected async hashPassword(password: string) {
        return await hash(password, 8);
    }
}
