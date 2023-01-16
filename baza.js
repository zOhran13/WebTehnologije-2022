const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt22', 'root', 'password', {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
   }
});
sequelize.authenticate().then(()=> {
    console.log("Connection has been stablised successfully.");
    }).catch(err => {
    console.log("Unable to connect to the database" , err);
    })
module.exports = sequelize