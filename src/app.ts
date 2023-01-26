import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import HttpError from './helpers/HttpError';
import userRouter from './routes/user.router';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.routes();
        this.middlewares();
    }

    private routes(): void {
        this.express.use(userRouter);
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(morgan('dev'));
        this.express.use(cors());
        this.express.use(this.errorHandlerNotFound);
        this.express.use(this.errorHandler);
    }


    private errorHandlerNotFound(req: Request, res: Response, next: NextFunction): void {
        const error = new HttpError(404, 'Not Found');
        next(error);
    }

    private errorHandler(error: HttpError, req: Request, res: Response, next: NextFunction): any {
        res.status(error.status || 500)
        return res.json({
            error: {
                code: error.status,
                message: error.message
            }
        });
    }

}

export default new App().express