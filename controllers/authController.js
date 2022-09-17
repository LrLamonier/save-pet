const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {check, validationResult, matchedData } = require('express-validator')
// const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const { promisify } = require("util");
const User = require('../models/User');


exports.signup = ( 
    async(req,res) => {
      const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

      //   const user = await User.findOne({
      //     email: data.email
      // });
      // if(user) {
      //     res.json({
      //         error: {email:{msg: 'E-mail já existe!'}}
      //     });
      //     return; 
      // }

      const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            password: passwordHash,
            token,
        });
        await newUser.save();

        res.json({token});

    }
  )








  
//////////////////////////////////////////////////////////
// login
exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);
        console.log(data)
        // Validando o e-mail
        const user = await User.findOne({email: data.email});
        if(!user) {
            res.json({error: 'E-mail e/ou senha errados!'});
            return;
        }

        // Validando a senha
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if(!match) {
          console.log(match)
            res.json({error: 'E-mail e/ou senha errados!'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email: data.email});

      })

// );

// logout
exports.logout = (_, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};



