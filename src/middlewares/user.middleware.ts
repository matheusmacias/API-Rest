import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";

import {
    userIdValidationSchema,
    userLoginValidationSchema,
    userUpdateValidationSchema,
    userValidationSchema
} from "../schemas/Joi/user.joi";
import sendError from "../helpers/error.helper";

class UserMiddleware {
    private validateFields(schema: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const validation = schema.validate(req.body);
            if (validation.error) {
                const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
                next(new sendError(400, errorMessage));
            }

            next();
        };
    }

    private validateFieldsWithId(schema: Joi.ObjectSchema) {
        return (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
            const validation = schema.validate({ ...req.params, ...req.body });
            if (validation.error) {
                const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
                next(new sendError(400, errorMessage));
            }

            next();
        };
    }

    private validateFieldOnlyId(schema: Joi.ObjectSchema) {
        return (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
            const validation = schema.validate(req.params);
            if (validation.error) {
                const errorMessage = validation.error.details.map(error => error.context?.label).join(" ");
                next(new sendError(400, errorMessage));
            }

            next();
        };
    }

    validateIdField = this.validateFieldOnlyId(userIdValidationSchema);
    validateUpdateFields = this.validateFieldsWithId(userUpdateValidationSchema);
    validateRegisterFields = this.validateFields(userValidationSchema);
    validateLoginFields = this.validateFields(userLoginValidationSchema);
}

export default new UserMiddleware();