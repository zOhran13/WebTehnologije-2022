const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

 
module.exports = function (sequelize, DataTypes) {
    const Predmet = sequelize.define('Predmet', {
        predmet: {
            type: Sequelize.STRING,
            field: 'predmet'
        },
        
        brojPredavanjaSedmicno: {
            type: Sequelize.INTEGER,
            field: 'brojPredavanjaSedmicno'
        },
        brojVjezbiSedmicno: {
            type: Sequelize.INTEGER,
            field: 'brojVjezbiSedmicno'
        }

        
   });
   return Predmet;
}