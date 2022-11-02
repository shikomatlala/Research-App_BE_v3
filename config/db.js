const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'researcherdna_db_v2',
    'root',
    'Aj0y2RUKMG7x',
    // '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;