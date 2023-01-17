const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

 
module.exports = function (sequelize, DataTypes) {
    const Prisustvo = sequelize.define('Prisustvo', {
        sedmica: {
            type: Sequelize.INTEGER,
            field: 'sedmica'
        },
        predavanja: {
            type: Sequelize.INTEGER,
            field: 'predavanja'
        },
        vjezbe: {
            type: Sequelize.INTEGER,
            field: 'vjezbe'
        },
        index: {
            type: Sequelize.STRING,
            field: 'index'
        },
        PredmetId: {
            type: Sequelize.INTEGER,
            field: 'PredmetId'
        },
        StudentId: {
            type: Sequelize.INTEGER,
            field: 'StudentId'
        }

        
   });
   return Prisustvo;
}