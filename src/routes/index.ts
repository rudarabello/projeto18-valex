import { Router } from "express";
import cardRouter from "./cardRouter";
// import rechargeRouter from "./rechargeRouter";
// import paymentRouter from "./paymentRouter";

const router = Router();

router.use(cardRouter);
// router.use(rechargeRouter);
// router.use(paymentRouter);

export default router;