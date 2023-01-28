import { Client } from 'pg';

export default class Database {
    private db: Client;

    public constructor() {
        this.db = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'empresa'
        });
    }

    public async connect(): Promise<void> {
        try {
            await this.db.connect();
        } catch (err) {
            throw new Error(`Error connecting to database: ${err.message}`);
        }
    }

    public async query(query: string, values?: any[]): Promise<any> {
        try {
            return this.db.query(query, values);
        } catch (err) {
            throw new Error(`Error executing query: ${err.message}`);
        }
    }

    public async end(): Promise<void> {
        try {
            await this.db.end();
        } catch (err) {
            throw new Error(`Error ending connection: ${err.message}`);
        }
    }

}