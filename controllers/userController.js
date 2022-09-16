// const AppError = require("../utils/appError");
const express = require('express');
const bcrypt = require('bcrypt')
const catchAsync = require("../utils/catchAsync");
//Apontamento antigo de conexão ao banco
// const db = require('../models/index');
const User = require("../models/User")
// const req = require('express/lib/request');


module.exports = {
  allUsers: async (req,res,next) => {
    try {
      const users = await User.findAll()
      console.log(users)
      res.json(users)
    } catch (error) {
      console.error(error.message)
      res.status(500).send({ "error": 'Erro!' })
    }
  },
  perfil: async (req, res, next) =>{
    let { id_user } = req.params;
    let userPerfil = await Usuario.findOne({
        where: {
            id: id_user
        }
    })
    return res.render('user-perfil', { userPerfil })
}
}

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

