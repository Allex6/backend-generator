export default `import express from "express";
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from "./lib/middlewares/errorHandler.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.listen(SERVER_PORT, () => console.log(\`Server running at port \${SERVER_PORT}\`));`;