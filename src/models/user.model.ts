import Database from "../services/database";

export default class User {
    private name: string;
    private email: string;
    private password: string;
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public get getName() {
        return this.name;
    }

    static create(name: string, email: string, password: string, db: Database): User {
        const user = new User(db);
        user.name = name;
        user.email = email;
        user.password = password;
        return user;
    }

    async getAllUsers(): Promise<any> {
        const query = `SELECT * FROM users`;
        const result = await this.db.query(query, []);
        return result.rows;
    }


    async getUserById(id: number): Promise<any> {
        const query = `SELECT * FROM users WHERE id = $1`;
        const values = [id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async checkIfNameExists(): Promise<boolean> {
        const query = `SELECT name FROM users WHERE name = $1`;
        const values = [this.name];
        const result = await this.db.query(query, values);
        return result.rows.length > 0;
    }

    async checkIfEmailExists(): Promise<boolean> {
        const query = `SELECT email FROM users WHERE email = $1`;
        const values = [this.email];
        const result = await this.db.query(query, values);
        return result.rows.length > 0;
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