import Joi from '@hapi/joi';

const userValidationSchema = Joi.object({
    name: Joi.string()
        .pattern(/^[a-zA-Z ]+$/)
        .min(10).max(50)
        .required()
        .label("O nome deve conter apenas letras e espaços, com no mínimo 10 e no máximo 50 caracteres.")
    ,
    email: Joi.string()
        .email()
        .label("E-mail fornecido é inválido, tente outro!")
        .required()
    ,
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
        .label("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos 1 letra, 1 número e 1 caractere especial (@$!%*#?&).")
        .required()
});

const userUpdateValidationSchema = Joi.object({
    id: Joi.number()
        .required()
        .integer()
        .positive()
        .label("O id deve ser um número inteiro positivo.")
    ,
    name: Joi.string()
        .pattern(/^[a-zA-Z ]+$/)
        .min(10).max(50)
        .required()
        .label("O nome deve conter apenas letras e espaços, com no mínimo 10 e no máximo 50 caracteres.")
    ,
    email: Joi.string()
        .email()
        .label("E-mail fornecido é inválido, tente outro!")
        .required()
    ,
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
        .label("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos 1 letra, 1 número e 1 caractere especial (@$!%*#?&).")
        .required()
});

const userIdValidationSchema = Joi.object({
    id: Joi.number()
        .required()
        .integer()
        .positive()
        .label("O id deve ser um número inteiro positivo.")
    ,
});

const userLoginValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .label("E-mail fornecido é inválido, tente outro!")
        .required()
    ,
    password: Joi.string()
        .min(8)
        .label("Senha fornecida é inválida")
        .required()
});

export {
    userValidationSchema,
    userLoginValidationSchema,
    userUpdateValidationSchema,
    userIdValidationSchema
};