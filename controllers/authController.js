const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { UsuarioPessoa } = require("../models");
const jwt = require("jsonwebtoken");
const { cpf, cnpj } = require("cpf-cnpj-validator");
const validator = require("validator");
const { promisify } = require("util");
const bcrypt = require("bcrypt");

const User = require("../models/usuarioPessoa");

// criar JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// enviar JWT
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.dataValues.id); // colocar a id que identifica o usuário no banco de dados

  // configurar cookie
  const cookieOptions = {
    expiresIn: new Date(
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
    name: user.dataValues.nome,
    email: user.dataValues.email,
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
  const dataError = [];

  if (!req.body.nome) {
    dataError.push("Nome inválido.");
  }

  if (!req.body.email || !validator.isEmail(req.body.email)) {
    dataError.push("Email inválido.");
  }

  if (!req.body.tel_contato) {
    dataError.push("Telefone inválido.");
  }

  if (!req.body.cpf && !req.body.cnpj) {
    dataError.push("Insira uma identificação.");
  }

  if (req.body.cpf && req.body.cnpj) {
    dataError.push("Escolha apenas um tipo de identificação.");
  }

  if (req.body.cpf) {
    req.body.cpf = req.body.cpf.replace(/./g, "").replace(/-/g, "");
  }
  if (req.body.cpf && !cpf.isValid(newCPF)) {
    dataError.push("CPF inválido.");
  }

  if (req.body.cnpj) {
    req.body.cnpj = req.body.cnpj.replace(/./g, "").replace(/-/g, "");
  }
  if (req.body.cnpj && !cnpj.isValid(req.body.cnpj * 1)) {
    dataError.push("CNPJ inválido.");
  }

  if (req.body.senha !== req.body.confirmSenha) {
    dataError.push("As senhas não são iguais.");
  }

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      validator.isWhitelisted(
        password,
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXWYZ!@#$%&*()_-+=0123456789"
      )
    );
  };

  if (!req.body.senha || !validatePassword(req.body.senha)) {
    dataError.push("Senha inválida.");
  }

  if (dataError.length > 0) {
    return next(new AppError(dataError.join(" "), 400));
  }

  const user = await UsuarioPessoa.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    return next(new AppError("Este e-mail já está cadastrado!", 400));
  }

  const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);

  const newUser = {
    nome: req.body.nome,
    email: req.body.email,
    contato: req.body.tel_contato,
    cpf: req.body.cpf || undefined,
    cnpj: req.body.cnpj || undefined,
    senha: senhaCriptografada,
  };

  const createdUser = await UsuarioPessoa.create(newUser);

  if (!createdUser) {
    return next(
      new AppError(
        "Não foi possível criar a conta. Tente novamente mais tarde!",
        500
      )
    );
  }

  // envio de e-mail de confirmação de conta

  createSendToken(createdUser, 201, req, res);
});

//////////////////////////////////////////////////////////
// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  // encontrar usuário no banco de dados
  const user = await UsuarioPessoa.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AppError("Email não cadastrado!", 404));
  }

  // validar se a senha está correta
  const passwordMatch = await bcrypt.compare(senha, user.senha);
  if (!passwordMatch) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  // enviar JWT
  createSendToken(user, 200, req, res);
});

// );

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

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Você não está conectado!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await UsuarioPessoa.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!currentUser) {
    return next(new AppError("Você não está conectado!", 401));
  }

  // verificar se a senha foi alterada e, caso tenha sido, comparar a timestamp iat do JWT com Date.now()
  // if (currentUser.passwordChange && currentUser.passwordChange < Date.now()) {
  //   return next(new AppError("Você não está conectado!", 401));
  // }

  // // permitir acesso
  req.user = currentUser;
  console.log(req.user);
  next();
});
