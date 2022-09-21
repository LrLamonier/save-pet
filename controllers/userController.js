// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Usuario } = require("../models");

//////////////////////////////////////////////////////////
// buscar todos os usuários
exports.allUsers = catchAsync(async (req, res, next) => {
  const allUsers = await Usuario.findAll();
  console.log(allUsers);
  res.status(200).json({
    status: "success",
  });
});

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
