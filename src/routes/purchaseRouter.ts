import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { purchaseValidation } from "../schemas/purchaseSchema";
import { purchase } from "../controllers/purchaseController";

const purchaseRouter = Router();

purchaseRouter.post('/buy/:id', validateSchema(purchaseValidation),
    purchase
);

export default purchaseRouter;