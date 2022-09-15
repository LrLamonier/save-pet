// const AppError = require("../utils/appError");
const express = require('express');
const bcrypt = require('bcrypt')
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



