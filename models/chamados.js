const { Usuario } = require('./usuario')
module.exports = (Connection, DataTypes) =>{
    const model = Connection.define('Chamados', {
        id_chamado: {
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
            local:{
                type: DataTypes.STRING(100),
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                references: {
                    model: Usuario,
                    key: Usuario.id_usuario
                }
            }  
    },
    {
        timestamps: false,
        tableName: 'chamados'
    })
    model.sync({ alter: true })
    return model 
}

console.log('Tabela de chamados criada')