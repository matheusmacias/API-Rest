import { NextFunction, Request, Response } from 'express';

import User from '../models/user.model';
import Database from '../services/database';
import HttpError from '../helpers/HttpError';


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

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const db = new Database();
            await db.connect();
            const user = User.create(
                req.body.name,
                req.body.email,
                req.body.password,
                db
            );

            if (await user.getUserByName()) {
                return res.status(500).send({
                    error: "This name has already been registered, try another!"
                });
            }

            if (await user.getUserByEmail()) {
                return res.status(500).send({
                    error: "This email has already been registered, try another!"
                });
            }

            await user.save();
            await db.end();
            return res.status(201).send('User created successfully');
        } catch (err) {
            const error = new HttpError(500, 'Could not create account.');
            next(error);
        }
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