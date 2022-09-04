import { Router } from "express";
import cardRouter from "./cardRouter";
import purchaseRouter from "./purchaseRouter";
import rechargeRouter from "./rechargeRouter";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(purchaseRouter);

export default router;