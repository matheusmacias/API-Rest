import IUser from "../interfaces/user.interface";

export default class User implements IUser {
    name: string;
    email: string;
    password: string;
}