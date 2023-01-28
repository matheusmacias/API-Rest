import Database from "../services/database";

export default class User {
    private name: string;
    private email: string;
    private password: string;
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    static create(name: string, email: string, password: string, db: Database): User {
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
            let i = 1;
            query += ' WHERE ';
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const element: any = filters[key];
                    query += `${key} = $${i} AND `;
                    values.push(element);
                    i++;
                }
            }
            query = query.slice(0, -4);
        }

        if (limit) {
            query += ` LIMIT ${limit}`;
        }
        if (offset) {
            query += ` OFFSET ${offset}`;
        }

        const result = await this.db.query(query, values);
        return result.rows;
    }

    async save(): Promise<void> {
        const query = `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`;
        const values = [this.name, this.email, this.password];
        return this.db.query(query, values);
    }

    async update(): Promise<void> {
        const query = `UPDATE users SET name = $1, email = $2, password = $3 WHERE email = $2`;
        const values = [this.name, this.email, this.password];
        return this.db.query(query, values);
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM users WHERE id = $1`;
        const values = [id];
        return this.db.query(query, values);
    }
}