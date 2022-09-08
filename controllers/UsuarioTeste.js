const AppError = require("../utils/appError");
const { UsuarioPessoa } = require('../models');

module.exports = {
    create: async (req, res,next) => {
        try {
            await UsuarioPessoa.create(req.body)
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