const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:')
export default sequelize;