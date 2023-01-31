export default interface IDatabase {
    query(query: string, values?: any[], name?: string): Promise<any>;
}
