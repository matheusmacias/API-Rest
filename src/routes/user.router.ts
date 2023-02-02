import { Router } from 'express'

import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';
class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.get('/users', UserController.index);
        this.router.get('/user/:id', UserController.getUser);
        this.router.get('/user/update/:id', UserMiddleware.validateUpdateFields, UserController.update);
        this.router.post('/user/accounts/login', UserMiddleware.validateLoginFields, UserController.logIn);
        this.router.post('/user/accounts/create', UserMiddleware.validateRegisterFields, UserController.createUser);
        this.router.delete('/user/:id', UserController.deleteUser);
    }
}

export default new UserRouter().router