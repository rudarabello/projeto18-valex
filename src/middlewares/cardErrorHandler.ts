import { Request, Response, NextFunction } from "express";

export function handleError(type: number, entity: string) {
    return {
        type,
        message: `${entity}`
    };
}
export default async function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction) {
    return res.status(error.type).send(error.message);
}