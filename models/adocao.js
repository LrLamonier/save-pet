const { DataTypes } = require("sequelize");

module.exports = (connection, DataTypes) => {   
    const model = connection.define('Adocao', {
        id_adocao: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false

        },
        tipoPet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        contato: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'adocao'
    })
    model.sync({ alter: true })
    return model
}
console.log("Tabela de adocao criada")