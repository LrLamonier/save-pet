module.exports = (connection, DataTypes) => {   
    const model = connection.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false

        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        contato: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING(11)
        },
        cnpj:{
            type: DataTypes.STRING(14)
        },
        password: {
            type: DataTypes.STRING(50)
        },
        dt_ultima_alter_senha:{
            type: DataTypes.DATE
        }
    },
    {
        timestamps: false,
        tableName: 'usuario'
    })
    model.sync({ alter: true })
    return model
}
console.log("Tabela usuario criada")