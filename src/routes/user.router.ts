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
        this.router.get('/users',
            UserController.index);

        this.router.get('/user/:id',
            UserMiddleware.validateIdField,
            UserController.getUser);

        this.router.post('/user/accounts/update/:id',
            UserMiddleware.validateUpdateFields,
            UserController.update);

        this.router.post('/user/accounts/login',
            UserMiddleware.validateLoginFields,
            UserController.logIn);

        this.router.post('/user/accounts/create',
            UserMiddleware.validateRegisterFields,
            UserController.createUser);

        this.router.delete('/user/accounts/delete/:id',
            UserMiddleware.validateIdField,
            UserController.deleteUser);
    }
}

export default new UserRouter().router