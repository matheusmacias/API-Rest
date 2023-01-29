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
            const result = await user.find();

            if (result.length == 0) {
                return res.status(200).send({
                    results: "Users not found"
                });
            }

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
            const result = await user.find(0, 1, { id: id })

            if (result.length == 0) {
                return res.status(200).send({
                    results: "User not found"
                });
            }

            await db.end();
            return res.status(200).send({
                results: result[0]
            });
        } catch (err) {
            const error = new HttpError(500, 'Could not find the user.');
            next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { name, email, password } = req.body;
            const db = new Database();
            await db.connect();
            const user = User.create(
                name,
                email,
                password,
                db
            );
            const getUserByEmail = await user.find(0, 1, { email: email });

            if (getUserByEmail.length > 0) {
                return res.status(500).send({
                    results: "This email has already been registered, try another!"
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

    public async update(req: Request<{ id: any }>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { name, email, password } = req.body;
            const db = new Database();
            await db.connect();
            const user = new User(db);
            const getUserByEmail = await user.find(0, 1, { email: email });

            if (getUserByEmail.length > 0) {
                if (getUserByEmail[0].email == email && getUserByEmail[0].id != id) {
                    return res.status(201).send({
                        results: "This email already exists, try another one!"
                    });
                }
            }

            await user.update({ name: name, email: email, password: password }, { id: id });
            await db.end();
            return res.status(200).send({
                results: "Account updated successfully"
            });

        } catch (err) {
            const error = new HttpError(500, 'Unable to update your email.');
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