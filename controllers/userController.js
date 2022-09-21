// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Usuario } = require("../models");

//////////////////////////////////////////////////////////
// buscar todos os usuários
exports.allUsers = catchAsync(async (req, res, next) => {
  const allUsers = await Usuario.findAll();

  const usersRes = allUsers.map((u) => {
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

//////////////////////////////////////////////////////////
// ver meu perfil
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

//////////////////////////////////////////////////////////
// editar perfil
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

//////////////////////////////////////////////////////////
// buscar perfil
exports.getUser = catchAsync(async (req, res, next) => {});
