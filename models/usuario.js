const { DataTypes } = require("sequelize");

module.exports = (connection, DataTypes) => {   
    const model = connection.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contato: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING
        },
        cnpj:{
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dtAlterSenha:{
            type: DataTypes.DATE
        }
    },
    {
        timestamps: false,
        tableName: 'usuarios'
    })
    model.sync({ alter: true })
    return model
}
console.log("Tabela de usuarios criada")