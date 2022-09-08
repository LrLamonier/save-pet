module.exports = (connection, DataTypes) => {   
    const model = connection.define('UsuarioPessoa', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),

        },
        email: {
            type: DataTypes.STRING(200)
        },
        contato: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING(50)
        }
    },
    {
        timestamps: false,
        tableName: 'usuarioPessoa'
    })
    model.sync({ alter: true })
    return model

}
console.log("Tabela criada")