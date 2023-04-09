import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./routes/routes";
import options from "./docs/apidoc";
import userRoutes from "./routes/user/userRoutes";
import googleAuth from "./routes/user/google.auth.routes";
import bodyParser from "body-parser";
import facebookAuth from "./routes/user/facebook.auth.routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// set up session middleware

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/user", userRoutes);

app.use(googleAuth);
app.use(facebookAuth);

app.get("/", (req, res) =>
  res
    .status(200)
    .json({ status: 200, message: "Welcome to Cogito's Ecommerce app API" })
);

app.use(router);

app.listen(port, () =>
  console.log(`app listening on port ${port}`, process.env.NODE_ENV)
);
=======
app.listen(port, async () => {
  console.log('Database Connected!');
  console.log(`app listening on port ${port}`, process.env.NODE_ENV);
});

export default app;
