import { Request, Response, NextFunction } from "express";

import { userValidationSchema } from "../schemas/validations/user.validation";
import sendError from "../helpers/error.helper";

class UserMiddleware {
    validateRegisterFields(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;

        const validation = userValidationSchema.validate({ name, email, password });
        if (validation.error) {
            const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
            next(new sendError(400, errorMessage));
        }

        next();
    }

    validateUpdateFields(req: Request<{ id: number }>, res: Response, next: NextFunction) {
        const { id } = req.params
        const { name, email, password } = req.body;

        const validation = userValidationSchema.validate({ id, name, email, password });
        if (validation.error) {
            const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
            next(new sendError(400, errorMessage));
        }

        next();
    }

    validateLoginFields(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const validation = userValidationSchema.validate({ email, password });
        if (validation.error) {
            const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
            next(new sendError(400, errorMessage));
        }

        next();
    }
}
export default new UserMiddleware();