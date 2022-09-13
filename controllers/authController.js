const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { promisify } = require("util");

const User = require("../models/usuarioPessoa");

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
exports.signup = catchAsync(async (req, res, next) => {
  // procurar usuário no banco de dados

  // const user = await procurarUsuárioNoBancoDeDados
  let user;

  // validar campos input
  if (user) {
    next(new AppError("Este e-mail já está cadastrado!", 400));
  }

  if (!req.body.name) {
    next(new AppError("Nome inválido!", 400));
  }

  if (!validator.isEmail(req.body.email)) {
    next(new AppError("Email inválido!", 400));
  }

  const validatePassword = (password) => {
    // regras para a senha
    return (
      password.length >= 8 &&
      validator.isWhiteListed(
        password,
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXWYZ!@#$%&*()_-+=0123456789"
      )
    );
  };

  if (!validatePassword(req.body.password)) {
    return next(new AppError("Senha inválida!", 400));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("As senhas não conferem!", 400));
  }

  // criar novo usuário
  //   const newUser = objeto do novo usuário
  let newUser;

  // envio de e-mail de confirmação de conta

  // envio do token JWT
  createSendToken(newUser, 201, req, res);
});

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
