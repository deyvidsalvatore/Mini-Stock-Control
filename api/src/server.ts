import express from "express";
import routes from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
