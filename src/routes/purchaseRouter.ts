import { Router } from "express";
import { purchase } from "../controllers/purchaseController";
import { validateSchema } from "../middlewares/validateSchema";
import { purchaseValidation } from "../schemas/purchaseSchema";

const purchaseRouter = Router();

purchaseRouter.post('/buy/:id', validateSchema(purchaseValidation),
    purchase
);

export default purchaseRouter;