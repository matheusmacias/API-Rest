import { ResultStatus } from "../../helpers/statusCode.helper";


export const getAllMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Users not found'
    },

    success: {
        status: ResultStatus.OK,
        success: true
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Error: Could not find the users'
    }
};

export const getUserMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User not found'
    },

    success: {
        status: ResultStatus.OK,
        success: true
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Error: Could not find the user'
    }
};

export const logInMessages = {
    emailNotFound: {
        status: ResultStatus.UNAUTHORIZED,
        success: false,
        message: 'Account not found.'
    },

    passwordIncorrect: {
        status: ResultStatus.UNAUTHORIZED,
        success: false,
        message: 'Incorrect password'
    },

    success: {
        status: ResultStatus.OK,
        success: true,
        message: 'Successfully logged in.'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Error: Could not find account.'
    }
};

export const createAccountMessages = {
    emailExists: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'This email has already been registered, try another!'
    },

    success: {
        status: ResultStatus.OK,
        success: true,
        message: 'User created successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Could not create account.'
    }
};

export const updateAcccountMessages = {
    emailExists: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'This email has already been registered, try another!'
    },

    success: {
        status: ResultStatus.OK,
        success: true,
        message: 'Account updated successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Unable to update your email.'
    }
};

export const deleteAccountMessages = {
    userNotFound: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User not found'
    },

    success: {
        status: ResultStatus.OK,
        success: true,
        message: 'User deleted successfully'
    },

    catch: {
        status: ResultStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Could not delete account.'
    }
};