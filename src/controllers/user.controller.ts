import { Request, Response } from 'express';

import userService from '../services/user.service';

class UserController {

    public async index(req: Request, res: Response) {
        const results = await userService.getAll();
        if (results.success) {
            return res.status(results.status).send({ results: results.results });
        }

        return res.status(results.status).send({ message: results.message });
    }

    public async getUser(req: Request<{ id: number }>, res: Response) {
        const { id } = req.params;
        const results = await userService.getUser(id);
        if (results.success) {
            return res.status(results.status).send({ results: results.results });
        }

        return res.status(results.status).send({ message: results.message });
    }

    public async logIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const results = await userService.logIn(email, password);
        if (results.success) {
            res.set("Authorization", `Bearer ${results.token}`);
            //const authorization = res.get("Authorization")?.split(" ")[1];
            //console.log(authorization);
            return res.status(results.status).send({ success: results.success, message: results.message });
        }
        return res.status(results.status).send({ message: results.message });
    }

    public async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const results = await userService.createAccount(name, email, password);

        if (results.success) {
            return res.status(results.status).send({ message: results.message });
        }

        return res.status(results.status).send({ message: results.message });
    }

    public async update(req: Request<{ id: number }>, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const results = await userService.updateAcccount(id, name, email, password);
        if (results.success) {
            return res.status(results.status).send({ message: results.message });
        }
        return res.status(results.status).send({ message: results.message });
    }

    public async deleteUser(req: Request<{ id: number }>, res: Response) {
        const { id } = req.params;
        const results = await userService.deleteAccount(id);
        if (results.success) {
            return res.status(results.status).send({ message: results.message });
        }
        return res.status(results.status).send({ message: results.message });
    }

}

export default new UserController()