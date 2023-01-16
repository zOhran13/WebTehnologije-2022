const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

 
module.exports = function (sequelize, DataTypes) {
    const Predmet = sequelize.define('Predmet', {
        predmeti: {
            type: Sequelize.STRING,
            field: 'predmeti'
        },
        NastavnikId: {
            type: Sequelize.INTEGER,
            field: 'NastavnikId'
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