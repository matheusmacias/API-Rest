import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import sendError from './helpers/error.helper';
import userRouter from './routes/user.router';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.bodyParser();
        this.routes();
        this.middlewares();
    }

    private routes(): void {
        this.express.use(userRouter);
    }

    private bodyParser(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(morgan('dev'));
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
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