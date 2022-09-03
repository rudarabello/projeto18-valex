import { Request, Response } from "express";
import { string } from "joi";
import * as CardService from "../services/cardServices";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}


export async function createCard(req: Request, res: Response) {
    const apiKey = req.headers['x-api-key'];
    const id: number = Number(req.params.id);
    const { type } = req.body;
    const infoFromCard = await CardService.createCard(apiKey, id, type);
    return res.status(201).send({infoFromCard});
}
export async function activateCard(req:Request,res:Response){
    const { number,cvc,password } : { number:string, cvc:string, password:string } = req.body;
    await CardService.activateCard(number,cvc,password);
    return res.status(201).send({message:"Card activate"});
}
export async function getTransactions(req:Request, res:Response){
    const { cardNumber } : { cardNumber:string } = req.body;
    const result = await CardService.getTransactions(cardNumber);
    return res.status(200).send(result);
}