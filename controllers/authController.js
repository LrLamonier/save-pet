const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");
const { cpf, cnpj } = require("cpf-cnpj-validator");
const validator = require("validator");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.dataValues.id_usuario);

  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  const resUser = {
    name: user.dataValues.nome,
    email: user.dataValues.email,
  };

  res.status(statusCode).json({
    status: "success",
    token,
    data: { resUser },
  });
};

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

  if (req.body.password !== req.body.confirmPassword) {
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

  if (!req.body.password || !validatePassword(req.body.password)) {
    dataError.push("Senha inválida.");
  }

  if (dataError.length > 0) {
    return next(new AppError(dataError.join(" "), 400));
  }

  const user = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    return next(new AppError("Este e-mail já está cadastrado!", 400));
  }

  const senhaCriptografada = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    nome: req.body.nome,
    email: req.body.email,
    contato: req.body.tel_contato,
    cpf: req.body.cpf || undefined,
    cnpj: req.body.cnpj || undefined,
    password: senhaCriptografada,
  };

  const createdUser = await Usuario.create(newUser);

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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  const user = await Usuario.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AppError("Email não cadastrado!", 404));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new AppError("Senha incorreta!", 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.resetPasswordRequest = catchAsync(async (req, res, next) => {
  const user = await Usuario.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(200).json({
      status: "success",
      message:
        "Um email para recuperação da senha foi enviado para este email, caso ele esteja cadastrado. O token é válido por 10 minutos.",
    });
  }

  const changeToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(changeToken)
    .digest("hex");

  const tokenExpires = Date.now() + 10 * 60 * 1000;

  user.set({
    dtTokenAlterSenha: hashedToken,
    dtAlterTokenExpir: tokenExpires,
  });

  user.save();

  res.status(201).json({
    status: "success",
    message:
      "Um email para recuperação da senha foi enviado para este email, caso ele esteja cadastrado. O token é válido por 10 minutos.",
    changeToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  if (!req.body.changeToken) {
    return next(new AppError("Token inválido!", 400));
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

  if (!req.body.password || !validatePassword(req.body.password)) {
    return next(new AppError("Senha inválida!", 400));
  }

  if (
    !req.body.confirmPassword ||
    req.body.confirmPassword !== req.body.password
  ) {
    return next(new AppError("As senhas não conferem.", 400));
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.changeToken)
    .digest("hex");

  const user = await Usuario.findOne({
    where: {
      dtTokenAlterSenha: hashedToken,
    },
  });

  if (!user || Date.now() > user.dataValues.dtAlterTokenExpir) {
    return next(new AppError("Token inválido!", 400));
  }

  const senhaCriptografada = await bcrypt.hash(req.body.password, 10);

  user.set({
    password: senhaCriptografada,
  });
  user.save();

  createSendToken(user, 200, req, res);
});

exports.deleteAccountRequest = catchAsync(async (req, res, next) => {
  const passwordMatch = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  if (!passwordMatch) {
    return next(new AppError("Senha inválida!", 401));
  }

  const deleteToken = crypto.randomBytes(32).toString("hex");

  const encryptedToken = crypto
    .createHash("sha256")
    .update(deleteToken)
    .digest("hex");

  const tokenExpires = Date.now() + 10 * 60 * 1000;

  req.user.set({
    dtTokenDeletar: encryptedToken,
    dtTokenDelExpir: tokenExpires,
  });
  req.user.save();

  res.status(201).json({
    status: "success",
    deleteToken,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  if (!req.body.deleteToken) {
    return next(new AppError("Token inválido!", 400));
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.deleteToken)
    .digest("hex");

  const user = await Usuario.findOne({
    where: {
      dtTokenDeletar: hashedToken,
    },
  });

  if (!user || Date.now() > user.dataValues.dtTokenDelExpir) {
    return next(new AppError("Token inválido!", 400));
  }

  await user.destroy();

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Conta deletada com sucesso!",
  });
});

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

  if (!token || token === "null" || token === null) {
    return next(new AppError("Você não está conectado!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await Usuario.findOne({
    where: {
      id_usuario: decoded.id,
    },
  });

  if (!currentUser || Date.now() < decoded.exp) {
    return next(new AppError("Você não está conectado!", 401));
  }

  if (
    currentUser.dataValues.dtSenhaAlter &&
    Date.now() < currentUser.dataValues.dtSenhaAlter
  ) {
    return next(new AppError("Você não está conectado!", 401));
  }

  req.user = currentUser;
  next();
});
