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