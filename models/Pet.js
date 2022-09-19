const db = require("../config/db")

const Pet = db.sequelize.define('pets', {
    idUser: {
        type: db.Sequelize.STRING
    },
    animal: {
        type: db.Sequelize.STRING
    },
    breed: {
        type: db.Sequelize.STRING
    },
    category: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    },
    images: {
        type: db.Sequelize.STRING
    },
    status: {
        type: db.Sequelize.STRING
    }
})

module.exports = Pet