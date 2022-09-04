import { Request, Response } from "express";
import {rechargeService} from "../services/rechargeService";

declare module 'http' {
    interface IncomingHttpHeaders {
        "x-api-key"?: string
    }
}

export async function rechargeController(req:Request, res:Response){
    const apiKey:any = req.headers['x-api-key'];
    const { amount, number } : { amount:number , number:string } =  req.body;
    await rechargeService(apiKey, number, amount);
    return res.status(200).send({message: "Recharged!"})
}