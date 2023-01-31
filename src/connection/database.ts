import { Pool, QueryConfig } from 'pg';

import IDatabase from '../interfaces/database.interface';

class Database implements IDatabase {
    private db: Pool;

    public constructor() {
        this.db = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'empresa',
            max: 15,
            connectionTimeoutMillis: 2000,
            idleTimeoutMillis: 10000,
        });
    }

    public async query(query: string, values?: any[], name?: string): Promise<any> {
        try {
            const queryConfig: QueryConfig = {
                text: query,
                values: values,
                name: name
            };
            return this.db.query(queryConfig);
        } catch (err) {
            throw new Error(`Error executing query: ${err.message}`);
        }
    }
}
export default new Database();