import bcrypt, { hash } from "bcrypt";

import userRepository from "../repositories/user.repository";
import IResult from "../interfaces/results.interface";
import {
    getAllMessages,
    getUserMessages,
    logInMessages,
    createAccountMessages,
    updateAcccountMessages,
    deleteAccountMessages
} from "../schemas/messages/user.message";

class UserService {

    public async getAll(): Promise<IResult> {
        try {
            const user = userRepository;
            const result = await user.find(["name", "email"]);
            if (!result.length) {
                return getAllMessages.userNotFound;
            }
            return { ...getAllMessages.sucess, results: result };
        } catch (err) {
            return getAllMessages.catch;
        }
    }

    public async getUser(id: number): Promise<IResult> {
        try {
            const user = userRepository;
            const result = await user.find(["name", "email"], { id: id }, 0);
            if (!result.length) {
                return getUserMessages.userNotFound;
            }
            return { ...getUserMessages.sucess, results: result[0] };
        } catch (err) {
            return getUserMessages.catch;
        }
    }

    private async emailExists(email: string): Promise<boolean> {
        const user = userRepository;
        const getUserByEmail = await user.find(["email"], { email: email }, 0, 1);
        return getUserByEmail.length > 0;
    }

    public async logIn(email: string, password: string): Promise<IResult> {
        try {
            const user = userRepository;
            const result = await user.find(["email", "password"], { email: email }, 0, 1);

            if (!result.length) {
                return logInMessages.emailNotFound;
            }

            const isMatch = await bcrypt.compare(password, result[0].password);
            if (!isMatch) {
                return logInMessages.passwordIncorrect;
            }


            return logInMessages.sucess;
        } catch (err) {
            return logInMessages.catch;
        }
    }

    public async createAccount(name: string, email: string, password: string): Promise<IResult> {
        try {
            const passwordHash = await hash(password, 10);
            const user = userRepository;
            user.name = name;
            user.email = email;
            user.password = passwordHash;

            if (await this.emailExists(email)) {
                return createAccountMessages.emailExists;
            }

            user.save();
            return createAccountMessages.sucess;
        } catch (err) {
            return createAccountMessages.catch;
        }
    }

    public async updateAcccount(id: number, name: string, email: string, password: string): Promise<IResult> {
        try {
            const passwordHash = await hash(password, 10);
            const user = userRepository;
            user.name = name;
            user.email = email;
            user.password = passwordHash;

            const getUserByEmail = await user.find(["email"], { email: user.email }, 0, 1);

            if (!getUserByEmail.length) {
                if (getUserByEmail[0].email == email &&
                    getUserByEmail[0].id != id) {
                    return updateAcccountMessages.emailExists;
                }
            }

            await user.update({ name: user.name, email: user.email, password: passwordHash }, { id: id });
            return updateAcccountMessages.sucess;
        } catch (err) {
            return updateAcccountMessages.catch;
        }

    }

    public async deleteAccount(id: number): Promise<IResult> {
        try {
            const user = userRepository;
            const getId = await user.find(["id"], { id: id })

            if (!getId.length) {
                return deleteAccountMessages.userNotFound;
            }

            await user.delete(id);
            return deleteAccountMessages.sucess;
        } catch (err) {
            return deleteAccountMessages.catch;
        }
    }
}
export default new UserService();