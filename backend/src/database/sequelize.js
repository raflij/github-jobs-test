require('dotenv').config()
const { Sequelize } = require('sequelize');
module.exports = new Sequelize('postgres', 'postgres', 'O33KryDOY3EKcGaM', {
    host: 'db.hzwnknvestmuuoolufth.supabase.co',
    port: 5432,
    dialect: 'postgres',
});