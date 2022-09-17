const db = require("../config/db")

const User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    contato: {
        type: db.Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //     notNull: {msg: "Inserir um contato é obrigatório"}
        // }
    },
    passwordHash: {
        type: db.Sequelize.STRING
    },
    token: {
        type: db.Sequelize.STRING
    }
})

module.exports = User

// Teste de criação de usuário
// User.create({
//     id: 1,
//     name: "Lucas",
//     email: "lucas@savepet.com.br",
//     contato: "21988058618",
//     password: "l123456"
// })

//Forçar a criação da tabela na primeira execução
// User.sync({force: true})

//Testando a conexão com o banco
// sequelize.authenticate().then(function(){
//     console.log("Conectado ao DB com sucesso!")
// }).catch(function(erro){
//     console.log("Falha na conexão ao DB: "+erro)
// })