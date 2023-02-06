import { Router } from 'express'

import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';
import UserAuthMiddleware from '../middlewares/userAuth.middleware';

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.get('/users',
            UserAuthMiddleware.authenticate,
            UserAuthMiddleware.onlyAdm,
            UserController.index);

        this.router.get('/user/:id',
            UserAuthMiddleware.authenticate,
            UserMiddleware.validateIdField,
            UserController.getUser);

        this.router.post('/user/accounts/update/:id',
            UserAuthMiddleware.authenticate,
            UserMiddleware.validateUpdateFields,
            UserController.update);

        this.router.post('/user/accounts/login',
            UserAuthMiddleware.denyAuthenticatedAccess,
            UserMiddleware.validateLoginFields,
            UserController.logIn);

        this.router.post('/user/accounts/create',
            UserAuthMiddleware.denyAuthenticatedAccess,
            UserMiddleware.validateRegisterFields,
            UserController.createUser);

        this.router.delete('/user/accounts/delete/:id',
            UserAuthMiddleware.authenticate,
            UserMiddleware.validateIdField,
            UserController.deleteUser);
    }
}

export default new UserRouter().router