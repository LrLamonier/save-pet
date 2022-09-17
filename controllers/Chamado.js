const { Chamados } = require('../models');

module.exports = {
    create: async (req, res,next) => {
        try {
            await Chamados.create(req.body)
        }catch(error){
            console.log("ERRO: ", JSON.stringify(error?.parent?.sqlMessage));
            next(new AppError('Erro na criação do do chamado', 400));
        }
        res.redirect("/")
    }
}