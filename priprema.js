const baza = require('./baza.js')
const sequelize = require('./baza.js');
const Nastavnik = require('./models/Nastavnik.js')(sequelize);
const Predmet = require('./models/Predmet.js')(sequelize);
const Student = require('./models/Student.js')(sequelize);
const Prisustvo = require('./models/Prisustvo.js')(sequelize);



Nastavnik.hasMany(Predmet, {as: 'NastavnikId', onDelete: 'CASCADE'})
Predmet.hasMany(Prisustvo,{as:'PredmetId'})

Nastavnik.sync().then(function(){
popujavanjeTabeleNstavnik()
});

Student.sync().then(function(){
  popunjavanjeTabeleStudent();
})


Predmet.sync().then(function(){
 Prisustvo.sync().then(function(){
  popunjavanjeTabelePredmet();
  popunjavanjeTabelePrisustvo();
 })
});


 function popujavanjeTabeleNstavnik(){
 Nastavnik.bulkCreate([
  { username: "USERNAME", password_hash: "$2a$10$zbiZcjIcPDf2w4YwyEs1kOtEJDfIg0cntTcAVYt4pewxpgbN5Zyxy" },
  { username: "USERNAME2", password_hash: "$2a$10$eExVBRbzxnEskStm2MWc9edOfVzfEF.95sn5Lmwp3hO3aVT.JDzz." },
  { username: "USERNAME3", password_hash: "$2a$10$xuwn4EXCopjpV9U52DsCA.k4mftwwD2pPMs.mnrzL8sSZxrN5lzEC" },
],{
  ignoreDuplicates: true,
}
).then(() => console.log("Users data have been saved"));
}


 function popunjavanjeTabelePredmet(){
 Predmet.bulkCreate([
  {NastavnikId:"1", predmet: "PREDMET1",brojPredavanjaSedmicno: "2", brojVjezbiSedmicno: "2"},
  {NastavnikId:"2", predmet:"PREDMET2",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"},
  {NastavnikId:"3", predmet:"PREDMET3",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"},
  {NastavnikId:"1", predmet:"PREDMET4",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"}

])
}
 function popunjavanjeTabeleStudent(){
 Student.bulkCreate([
  {ime: "Zlata Ohran",index: "12345"},
  {ime: "Besim Ohran",index: "12346"},
  {ime: "Safa Ohran",index: "12347"},
  {ime: "Ahmed Ohran",index: "12348"}
])
}

 function popunjavanjeTabelePrisustvo(){
Prisustvo.bulkCreate([
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347, PredmetId : "1"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348, PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "1"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "1"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "1"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "1"}, 
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "1"},

  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "2"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, PredmetId : "2"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "2"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "2"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "2"}, 
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "2"},
  

  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, PredmetId : "4"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "4"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "4"},
  {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "4"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "4"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "4"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, PredmetId : "4"},
  {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "4"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "4"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "4"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "4"},
  {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "4"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345,  PredmetId : "4"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346,  PredmetId : "4"},
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347,  PredmetId : "4"}, 
  {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348,  PredmetId : "4"}
  


])
}