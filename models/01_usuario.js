module.exports = (connection, DataTypes) => {
  const model = connection.define(
    "Usuario",
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contato: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
      },
      cnpj: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
      dtSenhaAlter: {
        type: DataTypes.STRING,
      },
      dtTokenAlterSenha: {
        type: DataTypes.STRING,
      },
      dtAlterTokenExpir: {
        type: DataTypes.STRING,
      },
      dtTokenDeletar: {
        type: DataTypes.STRING,
      },
      dtTokenDelExpir: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "usuarios",
    }
  );
  model.sync();
  return model;
};
console.log("Tabela de usuarios criada");
