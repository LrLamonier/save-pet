// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Usuario = require("../models/01_usuario");
const jwt = require("jsonwebtoken");
const { cpf, cnpj } = require("cpf-cnpj-validator");
const validator = require("validator");
const { promisify } = require("util");
const bcrypt = require("bcrypt");

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

        const newUser = new User({
            name: data.name,
            email: data.email,
            password: passwordHash,
            token,
        });
        
        newUser.save();

        res.json({token});

    }

exports.login = catchAsync(async (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return next(new AppError("Usuário ou senha inválidos!", 401));
  }

  // encontrar usuário no banco de dados
  const user = await Usuario.findOne({
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

exports.logout = (_, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.deleteAccount = catchAsync(async (req, res, next) => {
  // encontrar o usuário no banco de dados e deletar
  await Usuario.destroy({
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

  const currentUser = await Usuario.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!currentUser) {
    return next(new AppError("Você não está conectado!", 401));
  }

  req.user = currentUser;
  console.log(req.user);
  next();
});
