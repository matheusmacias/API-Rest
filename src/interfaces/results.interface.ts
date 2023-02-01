export default interface IResult {
    status: number;
    sucess: boolean;
    message?: string;
    results?: object;
}