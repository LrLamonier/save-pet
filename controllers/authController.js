const AppError = require("../utils/appError");
const { validationResult, matchedData } = require('express-validator')

// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {check } = require('express-validator')
const validator = require("validator");
const { promisify } = require("util");

const User = require('../models/connectDB');

// criar JWT
const signToken = (id) => {
  return (
    jwt.sign({ id }, process.env.JWT_SECRET),
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// enviar JWT
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id); // colocar a id que identifica o usuário no banco de dados

  // configurar cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // inserir cookie na resposta
  res.cookie("jwt", token, cookieOptions);

  // remover a senha do usuário do corpo do request
  user.password = undefined;

  // preparar resposta, extrair dados do objeto user
  const resUser = {
    name: user.name,
    email: user.email,
  };

  // enviar resposta
  res.status(statusCode).json({
    status: "success",
    token,
    data: { resUser },
  });
};

//////////////////////////////////////////////////////////
// criação de conta
// exports.signup = async(req,res,next) => {
//   // validate
//   if (await User.findOne({ where: { name: params.name } })) {
//       // throw 'Name "' + params.user + '" is already taken';
//       return next(new AppError("Usuário já cadastrado", 400));
//   }

//   // hash password
//   if (params.password) {
//       params.hash = await bcrypt.hash(params.password, 10);
//   }

//   // save user
//   await User.create(params);
  
//   // response
//   res.status(201).json({message: "Usuário criado com sucesso!"};
// }

exports.signup = ( [
  check('name', 'Insira seu nome, por favor').not().isEmpty(),
  check('email', 'Esse e-mail não é válido').isEmail(),
  check('password', 'A senha deve ter entre 6 e 8 caracteres').isLength({min:6}),
  check('contato', 'Insira um contato válido, por favor').not().isEmpty(),
  ], async (req, res, next) => {
  
  try {
      let { name, email, password, contato } = req.body
      const errors = validationResult(req)
      console.error(errors)
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
      }else{
          let user = new User( {name, email, password, contato })
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(password, salt)
          await user.save()
          const payload = {
              user: {
                  id: user.id
              }
          }
          if(user.id){
              res.json(user)
          }
      }
  } catch (err) {
      console.error(err.message)
      res.status(500).send({"error" : "Server Error"})
  }
})

//////////////////////////////////////////////////////////
// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  // encontrar usuário no banco de dados
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AppError("Email não cadastrado!", 404));
  }

  // validar se a senha está correta
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  // enviar JWT
  createSendToken(user, 200, req, res);
});

// logout
exports.logout = (_, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

//////////////////////////////////////////////////////////
// deletar conta
exports.deleteAccount = catchAsync(async (req, res, next) => {
  // encontrar o usuário no banco de dados e deletar
  await User.destroy({
    where: {
      id: req.user.id,
    },
  });

  // fazer logout
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });

  // resposta
  res.status(200).json({ status: "success" });
});

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
