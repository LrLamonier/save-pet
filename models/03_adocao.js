const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("savepet", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Adocao = sequelize.define(
  "Adocao",
  {
    id_adocao: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoPet: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      id_usuario_adocao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // model: models.Usuario,
          key: "id_usuario",
        },
      },
    },
);

module.exports = Adocao;
