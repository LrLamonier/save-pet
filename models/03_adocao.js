module.exports = (connection, DataTypes, models) => {
  const model = connection.define(
    "Adocao",
    {
      id_adocao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoPet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_usuario_adocao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: models.Usuario,
          key: "id_usuario",
        },
      },
    },
    {
      timestamps: false,
      tableName: "adocao",
    }
  );
  model.sync();
  return model;
};
console.log("Tabela de adoção criada");
