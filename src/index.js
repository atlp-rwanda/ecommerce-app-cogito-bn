import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./routes/routes";
import options from "./docs/apidoc";

const app = express();
app.use(cors());

dotenv.config();
const port = process.env.PORT;
app.use(express.json());

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) =>
  res
    .status(200)
    .json({ status: 200, message: "Welcome to Cogito's Ecommerce app API" })
);

app.use(router);

app.listen(port, () =>
  console.log(`app listening on port ${port}`, process.env.NODE_ENV)
);

export default app;
