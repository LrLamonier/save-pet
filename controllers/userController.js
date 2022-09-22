const catchAsync = require("../utils/catchAsync");
const { Usuario } = require("../models");
const AppError = require("../utils/appError");

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await Usuario.findAll();

  const usersRes = users.map((u) => {
    return {
      id_usuario: u.id_usuario,
      nome: u.nome,
      email: u.email,
      contato: u.contato,
      cpf: u.cpf,
      cnpj: u.cnpj,
      isAdmin: u.isAdmin,
    };
  });

  res.status(200).json({
    status: "success",
    data: usersRes,
  });
});

exports.myProfile = (req, res, next) => {
  const { nome, email, contato, cpf, cnpj } = req.user.dataValues;

  const id = cpf ? { cpf } : { cnpj };

  res.status(200).json({
    nome,
    email,
    contato,
    id,
  });
};

exports.editProfile = catchAsync(async (req, res, next) => {
  const { nome, email, contato } = req.body;

  const updatedUser = {};

  if (nome) {
    updatedUser.nome = nome;
  }
  if (email) {
    updatedUser.email = email;
  }
  if (contato) {
    updatedUser.contato = contato;
  }

  req.user.set(updatedUser);

  await req.user.save();

  res.status(200).json({
    status: "success",
    usuario: updatedUser,
  });
});

exports.getUserByID = catchAsync(async (req, res, next) => {
  const user = await Usuario.findOne({
    where: {
      id_usuario: req.params.id,
    },
  });

  if (!user) {
    return next(new AppError("Usuário não encontrado!", 404));
  }

  res.status(200).json({
    nome: user.nome,
    email: user.email,
    contato: user.contato,
  });
});
