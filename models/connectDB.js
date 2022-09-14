const Sequelize = require('sequelize')
const sequelize = new Sequelize('savepet_db', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    contato: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
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