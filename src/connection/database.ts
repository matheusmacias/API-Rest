import { Pool, QueryConfig } from 'pg';
import { config } from 'dotenv';

import IDatabase from '../interfaces/database.interface';

config();

class Database implements IDatabase {
    private db: Pool;

    public constructor() {
        const {
            PG_HOST,
            PG_PORT,
            PG_USER,
            PG_PASSWORD,
            PG_DATABASE,
            PG_MAX,
            PG_CONNECTION_TIMEOUT,
            PG_IDLE_TIMEOUT
        } = process.env;

        this.db = new Pool({
            host: PG_HOST,
            port: Number(PG_PORT),
            user: PG_USER,
            password: PG_PASSWORD,
            database: PG_DATABASE,
            max: Number(PG_MAX),
            connectionTimeoutMillis: Number(PG_CONNECTION_TIMEOUT),
            idleTimeoutMillis: Number(PG_IDLE_TIMEOUT)
        });

        this.handlePoolError();
    }

    public async query(query: string, values?: any[], name?: string): Promise<any> {
        try {
            const queryConfig: QueryConfig = {
                text: query,
                values: values,
                name: name
            };

            const result = await this.db.query(queryConfig);
            return result;
        } catch (err) {
            throw new Error(`Error executing query: ${err.message}`);
        }
    }

    private handlePoolError() {
        this.db.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }
}

export default new Database();