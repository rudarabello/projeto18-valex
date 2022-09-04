import { Router } from "express";
import cardRouter from "./cardRouter";
import rechargeRouter from "./rechargeRouter";
import purchaseRouter from "./purchaseRouter";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(purchaseRouter);

export default router;