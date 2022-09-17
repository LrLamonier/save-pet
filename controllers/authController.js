const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { check, validationResult, matchedData } = require("express-validator");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { promisify } = require("util");
const User = require("../models/User");

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
    return next(new AppError("Este e-mail já está cadastrado!", 400));
  }

  if (!req.body.name) {
    return next(new AppError("Nome inválido!", 400));
  }

  if (!validator.isEmail(req.body.email)) {
    return next(new AppError("Email inválido!", 400));
  }

  if (!req.body.contato) {
    return next(new AppError("Telefone inválido!", 400));
  }

  if (!req.body.cpf && !req.body.cnpj) {
    return next(new AppError("Insira uma identificação!", 400));
  }

  if (req.body.cpf && req.body.cnpj) {
    return next(new AppError("Escolha um tipo de identificação!", 400));
  }

  if (req.body.cpf && !cpf.isValid(cpf * 1)) {
    return next(new AppError("CPF inválido!", 400));
  }

  if (req.body.cnpj && !cnpj.isValid(cnpj * 1)) {
    return next(new AppError("CNPJ inválido!", 400));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("As senhas não conferem!", 400));
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

  // criar novo usuário
  const cryptPass = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    nome: req.body.name,
    email: req.body.email,
    contato: req.body.contato,
    cpf: req.body.cpf || undefined,
    cnpj: req.body.cnpj || undefined,
    password: cryptPass,
    dt_ultima_alter_senha: req.requestTime,
  };

  //   const newUser = objeto do novo usuário
  const createdUser = UsuarioPessoa.create(req.body);

  if (!createdUser) {
    return next(
      new AppError(
        "Não foi possível criar a conta. Tente novamente mais tarde!",
        500
      )
    );
  }

  // envio de e-mail de confirmação de conta

  // envio do token JWT
  console.log(newUser);
  createSendToken(newUser, 201, req, res);
});

//////////////////////////////////////////////////////////
// login
exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }
  const data = matchedData(req);
  console.log(data);
  // Validando o e-mail
  const user = await User.findOne({ email: data.email });
  if (!user) {
    res.json({ error: "E-mail e/ou senha errados!" });
    return;
  }

  // Validando a senha
  const match = await bcrypt.compare(data.password, user.passwordHash);
  if (!match) {
    console.log(match);
    res.json({ error: "E-mail e/ou senha errados!" });
    return;
  }

  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);

  user.token = token;
  await user.save();

  res.json({ token, email: data.email });
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
