import { Request, Response, NextFunction } from "express";

import { JWT } from "../auth/jwt.auth";
import { ResultStatus } from "../helpers/statusCode.helper";
import IResult from "../interfaces/results.interface";

interface IAuthRequest<T = Record<string, string>> extends Request<T> {
    user?: any;
}

class UserAuth {

    public authenticate(req: IAuthRequest<Record<string, any>>, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            const error: IResult = {
                status: ResultStatus.UNAUTHORIZED,
                success: false,
                message: 'Nenhum token fornecido, faça login'
            };
            return next(error);
        }
        try {
            const decoded = JWT.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            const error: IResult = {
                status: ResultStatus.UNAUTHORIZED,
                success: false,
                message: 'Token inválido'
            };
            next(error);
        }
    }

    public denyAuthenticatedAccess(req: IAuthRequest<Record<string, any>>, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            try {
                const decoded = JWT.verify(token);
                req.user = decoded;
            } catch (err) {
                return next();
            }
            const error: IResult = {
                status: ResultStatus.UNAUTHORIZED,
                success: false,
                message: 'Acesso negado para usuário autenticado'
            };
            return next(error);
        }
        return next();
    }

    public onlyAdm(req: IAuthRequest<Record<string, any>>, res: Response, next: NextFunction) {
        if (!req.user || req.user.privilege != 5) {
            const error: IResult = {
                status: ResultStatus.UNAUTHORIZED,
                success: false,
                message: 'Acesso não autorizado'
            };
            next(error);
        }

        return next();

    }
}
export default new UserAuth();
