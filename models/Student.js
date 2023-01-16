const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

 
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
        ime: {
            type: Sequelize.STRING,
            field: 'ime'
        },
        index: {
            type: Sequelize.STRING,
            field: 'index'
        }
   });
   return Student;
}