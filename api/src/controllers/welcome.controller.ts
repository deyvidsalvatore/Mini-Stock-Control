import { Request, Response } from "express";

class WelcomeController {
    handle(request: Request, response: Response) {
        response.json({ message: "Welcome to the Express server!" });
    }
}

export default WelcomeController;
