import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { rechargeController } from "../controllers/rechargeController";
import { rechargeValidation } from "../schemas/rechargeSchema";

const rechargeRouter = Router();

rechargeRouter.post('/recharge',
    validateSchema(rechargeValidation),
    rechargeController
);

export default rechargeRouter;