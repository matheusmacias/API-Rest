import { ResultStatus } from "../helpers/statusCode.helper";
export default interface IResult {
    status: ResultStatus;
    success: boolean;
    message?: string;
    results?: object;
}