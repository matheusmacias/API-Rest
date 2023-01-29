import IDatabase from "../interfaces/database.interface";

export default class User {
    private name: string;
    private email: string;
    private password: string;
    private db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    static create(name: string, email: string, password: string, db: IDatabase): User {
        const user = new User(db);
        user.name = name;
        user.email = email;
        user.password = password;
        return user;
    }

    async find(offset?: number, limit?: number, filters?: object): Promise<any> {
        let query = `SELECT * FROM users`;
        const values: any = [];

        if (filters) {
            const filterKeys = Object.keys(filters);
            const filterValues = filterKeys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
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

    async save(): Promise<void> {
        const query = `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`;
        const values = [this.name, this.email, this.password];
        return this.db.query(query, values);
    }

    async update(filters: object, where: object): Promise<void> {
        if (filters && where) {
            let query = 'UPDATE users SET ';
            const values: any = [];
            const keys = Object.keys(filters);
            const queryValues = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            query += queryValues;

            const whereKeys = Object.keys(where);
            const whereValues = whereKeys.map((key, index) => `${key} = $${keys.length + index + 1}`).join(' AND ');
            query += ` WHERE ${whereValues}`;

            values.push(...Object.values(filters), ...Object.values(where));
            await this.db.query(query, values);
        }
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM users WHERE id = $1`;
        const values = [id];
        return this.db.query(query, values);
    }
}