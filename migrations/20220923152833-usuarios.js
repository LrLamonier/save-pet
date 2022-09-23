'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', { 
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
