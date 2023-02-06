import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import userRouter from './routes/user.router';
import IResult from './interfaces/results.interface';
import { ResultStatus } from './helpers/statusCode.helper';

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
        const error: IResult = {
            status: ResultStatus.NOT_FOUND,
            success: false,
            message: 'Not Found'
        };
        next(error);
    }

    private errorHandler(error: IResult, req: Request, res: Response, next: NextFunction): any {
        res.status(error.status || ResultStatus.INTERNAL_SERVER_ERROR)
        return res.json({
            status: error.status,
            message: error.message
        });
    }

}

export default new App().express