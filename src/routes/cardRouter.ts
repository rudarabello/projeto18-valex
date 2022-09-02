import { Router } from "express";
import { createCard } from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchemas from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post('/create-card/:id',
    validateSchema(cardSchemas.typeCardValidation),
    createCard
);

export default cardRouter;