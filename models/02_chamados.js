module.exports = (connection, DataTypes, models) => {
  const model = connection.define(
    "Chamados",
    {
      id_chamado: {
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
      local: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dtAbertura: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      concluido: {
        type: DataTypes.BOOLEAN,
      },
      dtConclusao: {
        type: DataTypes.STRING,
      },
      id_usuario_chamado: {
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
      tableName: "chamados",
    }
  );
  model.sync();
  return model;
};
console.log("Tabela de chamados criada");
