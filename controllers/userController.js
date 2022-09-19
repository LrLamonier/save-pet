// const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Usuario } = require("../models");

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

  const user = await Usuario.findOne({
    where: {
      id: req.user.dataValues.id,
    },
  });

  user.set(updatedUser);

  await user.save();

  res.status(200).json({
    status: "success",
    usuario: updatedUser,
  });
});
