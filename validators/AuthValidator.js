const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength:{
                options: { min: 3 }
            },
            errorMessage: 'O nome precisa ter pelo menos 3 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: 'A senha precisa ter pelo menos 6 caracteres'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        },
    })
};