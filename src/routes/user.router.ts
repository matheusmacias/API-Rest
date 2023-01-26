import { Router, Request, Response } from 'express'

import UserController from '../controllers/user.controller';

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.get('/', UserController.index);
        this.router.get('/:id', UserController.getUser);
        this.router.post('/', UserController.createUser);
        this.router.put('/:id', UserController.updateUser);
        this.router.delete('/:id', UserController.deleteUser);
    }
}

export default new UserRouter().router