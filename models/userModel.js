const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const idvalidator = require('south-african-id-validator');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    id:{ //changed from id to userId
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    firstName:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    lastName:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING , 
        allowNull: false,
        validate:{
            isEmail : true
        },
    },

    password:{
       type: Sequelize.STRING,
       allowNull: false,
    },

    idNumber:{
        type: Sequelize.CHAR(13),
        primaryKey: true,
        allowNull: false,
        validate: {
        len: {args: [13,13], msg: 'Incorrect ID number length'},
            isCorrectId(value) {
                const idResult = idvalidator.validateIdNumber(value)
                if(!idResult.valid) throw  new Error('Invalid ID number!');
                this.title = idResult.gender =='male'? 'Mr' : 'Miss';
            }
        }
     },

     title:{
        type: Sequelize.STRING,
        allowNull: true,
     },
     userType:{
        type: Sequelize.STRING,
        defaultValue: 1,
        allowNull: false,
     },


     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
});


module.exports = User;