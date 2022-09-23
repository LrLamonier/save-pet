const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("savepet", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Chamados = sequelize.define(
  "chamados",
  {
    id_chamado: {
      type: Sequelize.INTEGER,
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
//   {
//     timestamps: false,
//     // tableName: "usuarios",
//   }
);

module.exports = Chamados;
