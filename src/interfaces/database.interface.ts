export default interface IDatabase {
    connect(): Promise<void>;
    query(query: string, values?: any[]): Promise<any>;
    end(): Promise<void>;
}
