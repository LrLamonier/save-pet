const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("savepet", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contato: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
    },
    cnpj: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
    },
    dtSenhaAlter: {
      type: Sequelize.STRING,
    },
    dtTokenAlterSenha: {
      type: Sequelize.STRING,
    },
    dtAlterTokenExpir: {
      type: Sequelize.STRING,
    },
    dtTokenDeletar: {
      type: Sequelize.STRING,
    },
    dtTokenDelExpir: {
      type: Sequelize.STRING,
    },
  },
//   {
//     timestamps: false,
//     // tableName: "usuarios",
//   }
);

module.exports = Usuario;
