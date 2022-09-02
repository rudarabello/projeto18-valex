import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";
import cardErrorHandler from "./middlewares/cardErrorHandler"

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(cardErrorHandler);

const PORT:number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log("Server online!"));