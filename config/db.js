const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'researcherdna_db_v2',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;