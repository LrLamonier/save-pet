// const AppError = require("../utils/appError");
<<<<<<< HEAD
const express = require('express');
// const catchAsync = require("../utils/catchAsync");
//Apontamento antigo de conexão ao banco
// const db = require('../models/index');
const User = require("../models/connectDB")
// const req = require('express/lib/request');



//consultar todos os usuários

exports.allUsers = ('/', async(req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ "error": 'Erro!' })
  }

})
// exports.allUsers = catchAsync('/', async(req, res) => {
//   let users = await User.allUsers();
//   console.log("usuários: ", JSON.stringify(users));
// })
// exports.getAll = (async (req,res, next) => {
//   try {
//       const users = await User.findAll();
//       console.log(users)
//       res.json(users)
//       } catch (err) {
//       console.error(err.message)
//       res.status(500).send({ "error": 'Erro!' })
//       }
//   });

// ver meu perfil
// exports.getMe = catchAsync(async (req, res, next) => {
  // pegar dados do usuário baseado na ID do request
  // const user = dados do usuário
  // let user;

  // retornar erro caso o usuário não seja encontrado
  // if (!user) {
  //   return next(new AppError("Usuário não encontrado!", 404));
  // }

  // criar objeto usuário para resposta
//   const userRes = {
//     name: user.name,
//     email: user.email,
//     telephone: user.telephone,
//   };

=======
const catchAsync = require("../utils/catchAsync");
const User = require("../models/usuarioPessoa")

module.exports = {
  allUsers: async (req,res,next) => {
    const users = await User.findAll();
    console.log(users);
    return res.json(users);
  },
  create: async (req, res,next) => {
    try {
        await User.create(req.body)
    }catch(error){
        console.log("ERRO: ", JSON.stringify(error?.parent?.sqlMessage));
        next(new AppError('Erro na criação do usuário!', 400));
    }
    res.redirect("/")
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
// // ver meu perfil
//   getMe = catchAsync(async (req, res, next) => {
//   // pegar dados do usuário baseado na ID do request
//   // const user = dados do usuário
//   let user;

//   // retornar erro caso o usuário não seja encontrado
//   if (!user) {
//     return next(new AppError("Usuário não encontrado!", 404));
//   }

//   // criar objeto usuário para resposta
//   const userRes = {
//     name: user.name,
//     email: user.email,
//     telephone: user.telephone,
//   };

>>>>>>> 2ee9a45 (recriação de rotas)
//   // resposta
//   res.status(200).json({
//     status: "success",
//     data: {
//       user: userRes,
//     },
//   });
// });

<<<<<<< HEAD
//////////////////////////////////////////////////////////
// editar perfil
// exports.editProfile = catchAsync(async (req, res, next) => {
=======
// //////////////////////////////////////////////////////////
// // editar perfil
// editProfile = catchAsync(async (req, res, next) => {
>>>>>>> 2ee9a45 (recriação de rotas)
//   const { name, email, telephone } = req.body;

//   // fazer alterações no usuário no banco de dados

//   // se erro, responder com erro

//   // se sucesso, responder com sucesso
//   let updatedUser;

//   res.status(200).json({
//     status: "success",
//     data: { user: updatedUser },
//   });
// });