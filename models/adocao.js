module.exports = (Connection, DataTypes) =>{
    const model = Connection.define('Adocao', {
        id_adocao: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        tipo_pet:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        descricao:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        contato: {
            type: DataTypes.STRING(20)
        }

    },
    {
        timestamps: false,
        tableName: 'adocao'
    })
    model.sync({ alter: true })
    return model
}
console.log('Tabela de chamados adocao')