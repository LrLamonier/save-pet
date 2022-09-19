const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../../models/User");

//////////////////////////////////////////////////////////
// controlar acesso a rotas restritas
exports.protect = catchAsync(async (req, res, next) => {
    let token;

  // identificar o token no cookie do request
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

// retornar um erro se não houver token
    if (!token) {
        return next(new AppError("Você não está conectado!", 401));
    }

// decodificar o token para extrair a ID do usuário
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// buscar no banco de dados a ID do usuário
    const currentUser = await User.findOne({ id: decoded });

// retornar erro de acesso negado caso o usuário não exista
    if (!currentUser) {
        return next(new AppError("Você não está conectado!", 401));
    }

// verificar se a senha foi alterada e, caso tenha sido, comparar a timestamp iat do JWT com Date.now()
    if (currentUser.passwordChange && currentUser.passwordChange < Date.now()) {
        return next(new AppError("Você não está conectado!", 401));
    }

// permitir acesso
    req.user = currentUser;
    next();
});

// module.exports = {
//     private: async (req, res, next) => {
//         if(!req.query.token && !req.body.token) {
//             res.json({notallowed: true});
//             return;
//         }

//         let token = '';
//         if(req.query.token) {
//             token = req.query.token;
//         }
//         if(req.body.token) {
//             token = req.body.token;
//         }

//         if(token == '') {
//             res.json({notallowed: true});
//             return;
//         }

//         const user = await User.findOne({token});

//         if(!user) {
//             res.json({notallowed: true});
//             return;
//         }

//         next();
//     }
// };
