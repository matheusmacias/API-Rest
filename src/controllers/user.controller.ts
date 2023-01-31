import { NextFunction, Request, Response } from 'express';

import userService from '../services/user.service';

class UserController {

    public async index(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { name, email, password } = req.body;
        userService.createAccount(name, email, password);

        return res.status(500).send({
            results: 'Conta criada com sucesso'
        });
    }

    public async getUser(req: Request<{ id: number }>, res: Response, next: NextFunction): Promise<any> {
        //
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        //
    }

    public async update(req: Request<{ id: any }>, res: Response, next: NextFunction) {
        //
    }

    public async deleteUser(req: Request<{ id: number }>, res: Response, next: NextFunction): Promise<any> {
        //
    }

}

export default new UserController()