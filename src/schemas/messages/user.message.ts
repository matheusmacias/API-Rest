import { ResultStatus } from "../../helpers/statusCode.helper";


export const getAllMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Users not found'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Error: Could not find the users'
    }
};

export const getUserMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'User not found'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Error: Could not find the user'
    }
};

export const logInMessages = {
    emailNotFound: {
        status: ResultStatus.UNAUTHORIZED,
        sucess: false,
        message: 'Account not found.'
    },

    passwordIncorrect: {
        status: ResultStatus.UNAUTHORIZED,
        sucess: false,
        message: 'Incorrect password'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true,
        message: 'Successfully logged in.'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Error: Could not find account.'
    }
};

export const createAccountMessages = {
    emailExists: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'This email has already been registered, try another!'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true,
        message: 'User created successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Could not create account.'
    }
};

export const updateAcccountMessages = {
    emailExists: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'This email has already been registered, try another!'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true,
        message: 'Account updated successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Unable to update your email.'
    }
};

export const deleteAccountMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'User not found'
    },

    sucess: {
        status: ResultStatus.OK,
        sucess: true,
        message: 'User deleted successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        sucess: false,
        message: 'Could not delete account.'
    }
};