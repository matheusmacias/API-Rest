import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import sendError from './helpers/error.helper';
import userRouter from './routes/user.router';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
    }

    private routes(): void {
        this.express.use(userRouter);
    }

    private middlewares(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(morgan('dev'));
    }

    private errorHandlerNotFound(req: Request, res: Response, next: NextFunction): void {
        const error = new sendError(404, 'Not Found');
        next(error);
    }

    private errorHandler(error: sendError, req: Request, res: Response, next: NextFunction): any {
        res.status(error.status || 500)
        return res.json({
            error: {
                code: error.status,
                results: error.message
            }
        });
    }

}

export default new App().express