import express, { NextFunction, Request, Response } from "express";
import routes from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/", routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message,
        });
    }
    res.status(500).json({
        status: "error",
        message: "Internal server error.",
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
