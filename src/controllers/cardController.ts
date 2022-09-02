import { Request, Response } from "express";
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
    await CardService.createCard(apiKey, id, type);
    return res.sendStatus(201);
}