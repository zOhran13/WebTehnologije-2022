const sequelize = require('./baza.js');
const Nastavnik = require('./models/Nastavnik.js')(sequelize);
const Predmet = require('./models/Predmet.js')(sequelize);
const Student = require('./models/Student.js')(sequelize);
const Prisustvo = require('./models/Prisustvo.js')(sequelize);

Nastavnik.hasMany(Predmet, {as: 'NastavnikId', onDelete: 'CASCADE'})
Student.hasMany(Prisustvo,{as: 'StudentId'})
Predmet.hasMany(Prisustvo,{as:'PredmetId'})

Nastavnik.sync()
Predmet.sync()
Student.sync()
Prisustvo.sync()

Nastavnik.bulkCreate([
  { username: "USERNAME", password_hash: "$2a$10$zbiZcjIcPDf2w4YwyEs1kOtEJDfIg0cntTcAVYt4pewxpgbN5Zyxy" },
  { username: "USERNAME2", password_hash: "$2a$10$eExVBRbzxnEskStm2MWc9edOfVzfEF.95sn5Lmwp3hO3aVT.JDzz." },
  { username: "USERNAME3", password_hash: "$2a$10$xuwn4EXCopjpV9U52DsCA.k4mftwwD2pPMs.mnrzL8sSZxrN5lzEC" },
],{
  ignoreDuplicates: true,
}
).then(() => console.log("Users data have been saved"));

Predmet.bulkCreate([
  {NastavnikId:"1", predmet: "PREDMET1",brojPredavanjaSedmicno: "2", brojVjezbiSedmicno: "2"},
  {NastavnikId:"2", predmet:"PREDMET2",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"},
  {NastavnikId:"3", predmet:"PREDMET3",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"}
])

Student.bulkCreate([
  {ime: "Zlata Ohran",index: "12345"},
  {ime: "Besim Ohran",index: "12346"},
  {ime: "Safa Ohran",index: "12347"},
  {ime: "Ahmed Ohran",index: "12348"}
])

Prisustvo.bulkCreate([
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"}, 
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},

  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"}, 
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},

])