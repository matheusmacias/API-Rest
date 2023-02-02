import { QueryResult, QueryResultRow } from "pg";

import Database from "../connection/database";
import IDatabase from "../interfaces/database.interface";
import User from "../models/user.model";

class UserRepository extends User {
    db: IDatabase;
    constructor() {
        super();
        this.db = Database;
    }

    static create(name: string, email: string, password: string): UserRepository {
        const user = new UserRepository();
        user.name = name;
        user.email = email;
        user.password = password;
        return user;
    }

    async find(columns: string[] = ['*'], filters?: object, offset?: number, limit?: number): Promise<QueryResultRow> {
        let query = `SELECT ${columns.join(', ')} FROM users`;
        const values: any[] = [];

        if (filters) {
            const filterKeys = Object.keys(filters);
            const filterValues = filterKeys
                .map((key, index) => `${key} = $${index + 1}`)
                .join(' AND ');

            query += ` WHERE ${filterValues}`;
            values.push(...Object.values(filters));
        }

        if (limit) {
            query += ` LIMIT $${values.length + 1}`;
            values.push(limit);
        }
        if (offset) {
            query += ` OFFSET $${values.length + 1}`;
            values.push(offset);
        }

        const result = await this.db.query(query, values);
        return result.rows;
    }

    async save(): Promise<QueryResult> {
        const query = `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`;
        const values = [this.name, this.email, this.password];
        return this.db.query(query, values);
    }

    async update(filters: object, where: object): Promise<any> {
        if (filters && where) {
            let query = 'UPDATE users SET ';
            const values: any = [];
            const keys = Object.keys(filters);

            const queryValues = keys
                .map((key, index) => `${key} = $${index + 1}`)
                .join(', ');

            query += queryValues;

            const whereKeys = Object.keys(where);
            const whereValues = whereKeys
                .map((key, index) => `${key} = $${keys.length + index + 1}`)
                .join(' AND ');

            query += ` WHERE ${whereValues}`;

            values.push(...Object.values(filters), ...Object.values(where));
            await this.db.query(query, values);
        }
    }

    async delete(id: number): Promise<QueryResult> {
        const query = `DELETE FROM users WHERE id = $1`;
        const values = [id];
        return this.db.query(query, values);
    }
}
export default new UserRepository();