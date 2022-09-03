import { Router } from "express";
import * as cardControllers from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchemas from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post('/create-card/:id',
    validateSchema(cardSchemas.typeCardValidation),
    cardControllers.createCard
);
cardRouter.put('/activate',
validateSchema(cardSchemas.activateValidation),
cardControllers.activateCard
);

export default cardRouter;