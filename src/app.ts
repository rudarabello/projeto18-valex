import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import cardErrorHandler from "./middlewares/cardErrorHandler";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(cardErrorHandler);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));