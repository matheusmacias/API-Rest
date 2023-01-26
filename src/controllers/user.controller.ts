import { Request, Response } from 'express';

class UserController {

    public async index(req: Request, res: Response): Promise<any> {
        return res.json({
            name: "matheus"
        });
    }

    public async getUser(req: Request, res: Response): Promise<any> {
        return res.json({
            name: "matheus"
        });
    }

    public async createUser(req: Request, res: Response): Promise<any> {
        return res.json({
            name: "matheus"
        });
    }

    public async updateUser(req: Request, res: Response): Promise<any> {
        return res.json({
            name: "matheus"
        });
    }

    public async deleteUser(req: Request, res: Response): Promise<any> {
        return res.json({
            name: "matheus"
        });
    }

}

export default new UserController()