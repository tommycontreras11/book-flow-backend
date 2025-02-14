import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

const validateSchema = (schema: AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.body = await schema.validate(req.body, { 
                abortEarly: false, // Collect all validation errors
                stripUnknown: true // Remove unknown fields
            });
            return next(); // ✅ Ensure Express continues to the next middleware
        } catch (error: any) {
            res.status(400).json({
                errors: error.inner?.map((err: any) => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }
    };
};

export default validateSchema;
