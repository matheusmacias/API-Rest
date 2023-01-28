import { NextFunction, Request, Response } from 'express';

import User from '../models/user.model';
import Database from '../services/database';
import HttpError from '../helpers/HttpError';


class UserController {

    public async index(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const db = new Database();
            await db.connect();
            const user = new User(db);
            const result = await user.getAllUsers();
            await db.end();
            return res.status(200).send({
                results: result
            });
        } catch (err) {
            const error = new HttpError(500, 'Could not find the users.');
            next(error);
        }
    }

    public async getUser(req: Request<{ id: number }>, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.connect();
            const user = new User(db);
            const result = await user.getUserById(id);
            await db.end();
            return res.status(200).send({
                results: result
            });
        } catch (err) {
            const error = new HttpError(500, 'Could not find the users.');
            next(error);
        }
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

            if (await user.checkIfNameExists()) {
                return res.status(500).send({
                    error: "This name has already been registered, try another!"
                });
            }

            if (await user.checkIfEmailExists()) {
                return res.status(500).send({
                    error: "This email has already been registered, try another!"
                });
            }

            await user.save();
            await db.end();
            return res.status(201).send({
                results: "User created successfully"
            });
        } catch (err) {
            const error = new HttpError(500, 'Could not create account.');
            next(error);
        }
    }

    public async deleteUser(req: Request<{ id: number }>, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.connect();
            const user = new User(db);
            await user.delete(id);
            await db.end();
            return res.status(200).send({
                results: "User deleted successfully"
            });
        } catch (err) {
            const error = new HttpError(500, 'Could not delete account.');
            next(error);
        }
    }

}

export default new UserController()