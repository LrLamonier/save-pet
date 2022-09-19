module.exports = (connection, DataTypes) => {
  const model = connection.define(
    "UsuarioPessoa",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(50),
      },
      email: {
        type: DataTypes.STRING(200),
      },
      contato: {
        type: DataTypes.STRING,
      },
      senha: {
        type: DataTypes.STRING(100),
      },
    },
    {
      timestamps: false,
      tableName: "usuarioPessoa",
    }
  );
  model.sync({ alter: true });
  return model;
};
console.log("Tabela criada");
