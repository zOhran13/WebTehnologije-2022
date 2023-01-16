const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

 
module.exports = function (sequelize, DataTypes) {
    const Nastavnik = sequelize.define('Nastavnik', {
        username: {
            type: Sequelize.STRING,
            field: 'username'
        },
        password_hash: {
            type: Sequelize.STRING,
            field: 'password_hash'
        }
   });
   return Nastavnik;
}