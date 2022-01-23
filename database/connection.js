const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('annotations', 'user', 'pw', {
  dialect: 'sqlite',
  host: './annotationsDb.sqlite'
})

module.exports = sequelize;