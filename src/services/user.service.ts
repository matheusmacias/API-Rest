import userRepository from "../repositories/user.repository";
import IResult from "../interfaces/results.interface";

class UserService {

    public async getAll(): Promise<IResult> {
        try {
            const user = userRepository;
            const result = await user.find(["name", "email"]);
            if (!result.length) {
                return { status: 500, sucess: false, message: 'Users not found' }
            }
            return { status: 500, sucess: true, results: result }
        } catch (err) {
            return { status: 500, sucess: false, message: 'Error: Could not find the users' }
        }
    }

    public async getUser(id: number): Promise<IResult> {
        try {
            const user = userRepository;
            const result = await user.find(["name", "email"], { id: id }, 0);
            if (!result.length) {
                return { status: 200, sucess: false, message: 'User not found' };
            }
            return { status: 200, sucess: true, results: result[0] };
        } catch (err) {
            return { status: 500, sucess: false, message: 'Error: Could not find the user.' };
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
            const result = await user.find(["name", "email"], { email: email, password: password });
            if (!result.length) {
                return { status: 500, sucess: false, message: 'Account not found' }
            }
            return { status: 200, sucess: true, message: 'Successfully logged in' }
        } catch (err) {
            return { status: 500, sucess: false, message: 'Error: Could not find account.' }
        }
    }

    public async createAccount(name: string, email: string, password: string): Promise<IResult> {
        try {
            const user = userRepository;
            user.name = name;
            user.email = email;
            user.password = password;

            if (await this.emailExists(email)) {
                return { status: 500, sucess: false, message: 'This email has already been registered, try another!' };
            }

            user.save();
            return { status: 200, sucess: true, message: 'User created successfully' };
        } catch (err) {
            return { status: 500, sucess: false, message: 'Could not create account.' };
        }
    }

    public async updateAcccount(id: number, name: string, email: string, password: string): Promise<IResult> {
        try {
            const user = userRepository;
            user.name = name;
            user.email = email;
            user.password = password;

            const getUserByEmail = await user.find(["email"], { email: email }, 0, 1);

            if (!getUserByEmail.length) {
                if (getUserByEmail[0].email == email &&
                    getUserByEmail[0].id != id) {
                    return { status: 500, sucess: false, message: 'This email already exists, try another one!' };
                }
            }

            await user.update({ name: name, email: email, password: password }, { id: id });
            return { status: 200, sucess: true, message: 'Account updated successfully' };
        } catch (err) {
            return { status: 500, sucess: false, message: 'Unable to update your email.' };
        }

    }

    public async deleteAccount(id: number): Promise<IResult> {
        try {
            const user = userRepository;
            await user.delete(id);
            return { status: 200, sucess: true, message: 'User deleted successfully' };
        } catch (err) {
            return { status: 500, sucess: false, message: 'Could not delete account.' };
        }
    }
}
export default new UserService();