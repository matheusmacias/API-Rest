import { Router } from 'express'

import UserController from '../controllers/user.controller';

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.get('/users', UserController.index);
        this.router.get('/user/:id', UserController.getUser);
        this.router.post('/user', UserController.createUser);
        this.router.delete('/user/:id', UserController.deleteUser);
    }
}

export default new UserRouter().router