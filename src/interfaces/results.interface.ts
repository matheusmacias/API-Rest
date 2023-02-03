import { ResultStatus } from "../helpers/statusCode.helper";
export default interface IResult {
    status: ResultStatus;
    sucess: boolean;
    message?: string;
    results?: object;
}