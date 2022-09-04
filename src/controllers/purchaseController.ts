import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService"

export async function purchase(req: Request, res: Response) {
    const posId: number = Number(req.params.id);
    const { number, password, amount }: { number: string, password: string, amount: number } = req.body;
    await purchaseService.purchase(posId, number, password, amount);
    return res.status(200).send({ message: "Purchased successful" });
}