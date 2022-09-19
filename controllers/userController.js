// const AppError = require("../utils/appError");
const express = require('express');
const bcrypt = require('bcrypt')
const catchAsync = require("../utils/catchAsync");
const { UsuarioPessoa } = require("../models");


  // retornar erro caso o usuário não seja encontrado
  if (!user) {
    return next(new AppError("Usuário não encontrado!", 404));
  }

  // criar objeto usuário para resposta
  const userRes = {
    name: user.name,
    email: user.email,
    telephone: user.telephone,
  };

  // resposta
  res.status(200).json({
    status: "success",
    data: {
      user: userRes,
    },
  });
});

//////////////////////////////////////////////////////////
// editar perfil
exports.editProfile = catchAsync(async (req, res, next) => {
  // const { name, email, telephone } = req.body;
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

  const user = await UsuarioPessoa.findOne({
    where: {
      id: req.user.dataValues.id,
    },
  });

  user.set(updatedUser);
  await user.save();
