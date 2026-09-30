import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateBody = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error!.issues 
            });
        }

        req.body = result.data;
        next();
    };
};