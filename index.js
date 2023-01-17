const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('./baza.js');

const app = express();
const fs = require("fs");
const session = require("express-session");
const rout = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use("/", rout);
const PORT = 3000;
app.use(bodyParser.json());

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
// Nastavnik.bulkCreate([
//   { username: "USERNAME", password_hash: "$2a$10$zbiZcjIcPDf2w4YwyEs1kOtEJDfIg0cntTcAVYt4pewxpgbN5Zyxy" },
//   { username: "USERNAME2", password_hash: "$2a$10$eExVBRbzxnEskStm2MWc9edOfVzfEF.95sn5Lmwp3hO3aVT.JDzz." },
//   { username: "USERNAME3", password_hash: "$2a$10$xuwn4EXCopjpV9U52DsCA.k4mftwwD2pPMs.mnrzL8sSZxrN5lzEC" },
// ],{
//   ignoreDuplicates: true,
// }
// ).then(() => console.log("Users data have been saved"));

// Predmet.bulkCreate([
//   {NastavnikId:"1", predmet: "PREDMET1",brojPredavanjaSedmicno: "2", brojVjezbiSedmicno: "2"},
//   {NastavnikId:"2", predmet:"PREDMET2",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"},
//   {NastavnikId:"3", predmet:"PREDMET3",brojPredavanjaSedmicno: "2",brojVjezbiSedmicno: "2"}
// ])

// Student.bulkCreate([
//   {ime: "Zlata Ohran",index: "12345"},
//   {ime: "Besim Ohran",index: "12346"},
//   {ime: "Safa Ohran",index: "12347"},
//   {ime: "Ahmed Ohran",index: "12348"}
// ])

// Prisustvo.bulkCreate([
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "1"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "1"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "1"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"}, 
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "1"},

//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12345, StudentId : "1", PredmetId : "2"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12346, StudentId : "2", PredmetId : "2"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12347, StudentId : "3", PredmetId : "2"},
//   {sedmica: "1", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},
//   {sedmica: "2", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},
//   {sedmica: "3", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"}, 
//   {sedmica: "4", predavanja: "1", vjezbe: "0", index: 12348, StudentId : "4", PredmetId : "2"},

// ])
app.use(express.static('public'))
app.use(express.static("./public/css"));
app.use(express.static("./public/html"));
app.use(express.static("./public/Ikonice"));
app.use(express.static("./public/scripts"));

app.get('/prisustvo',(req,res)=>{
  res.sendFile(__dirname + '/public/html/prisustvo.html')
})
app.get('/prijava',(req,res)=>{
  res.sendFile(__dirname + '/public/html/prijava.html')
})
app.get('/predmet',(req,res)=>{
  res.sendFile(__dirname + '/public/html/predmet.html')
})

app.use(
  session({
    secret: "neka tajna sifra",
    username: "",
    predmeti: [],
    resave: true,
    saveUninitialized: true,
  })
);
app.post('/hes', (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    res.json({"password_hash": hash});
    });
  });
var pronasao = null;
var pr=null;

app.post("/login",  function (req, res) {
  if (!req.body.data.username || !req.body.data.password)
    return res
      .status(400)
      .send({ poruka: "Something is wrong with body of request." });

  const username = req.body.data.username;
  const password = req.body.data.password;
  var temp = [];
  var nizPromisea = [];
   Nastavnik.findAll({raw:true})
  .then(data => {
    var nastavnici = data
    var predmeti = []
   
    for(let i = 0; i<nastavnici.length; i++){
      //console.log('ovdje sam',username)

      if(username === nastavnici[i].username) {
        const result = bcrypt.compare(password,nastavnici[i].password_hash);
        if(result){
         
          pronasao = nastavnici[i].username;
          pr = nastavnici[i].id;

          break;
        }
      } 
    }
        if (pronasao) {
          req.session.username = username;
          Predmet.findAll({raw:true,
            where:{
              NastavnikId: pr
            }
          }).then(predmeti=>{
            
            predmeti.forEach(element => {
              temp.push(element.predmet)

              
            });

            req.session.predmeti = JSON.stringify(temp);
            req.session.save();

//console.log('ovdje predmeti',req.session)
          })
          

         // req.session.predmeti = JSON.stringify(pronasao.predmeti);
          pronasao = null;
          pr = null;
          return res.send({ poruka: "Uspješna prijava" });
        } else {
          return res
            .status(404)
            .send({ poruka: "Neuspješna prijava" });
        }

  })
});

app.post("/logout", function (req, res) {
  req.session.destroy();
  // session.username = null;
  // session.predmeti = null;
  
});

app.get("/predmeti", function (req, res) {
  if (!req.session.username) {
    return res.status(400).send({ greska: "Nastavnik nije loginovan" });
  }
  //console.log('evo nas',req.session)
  return res.send({ predmeti: JSON.parse(req.session.predmeti)});
});

app.get("/predmet/:naziv", function (req, res) {
 
  var pom=[];
  var st = [];
  var objekat =[];
  const { naziv } = req.params;
 
    if (!req.session.username) {
      return res.status(400).send({ greska: "Nastavnik nije loginovan" });
    } 
     else {
      Predmet.findAll({raw:true})
      .then(data => {
        var predmeti = data;
      //})
      //const predmeti = JSON.parse();
      var pronasao = false;
      var podaciZaVjezbe = null;
      var podaciZaPredavanja = null;
      var studenti=[];
      for (let i = 0; i < predmeti.length; i++) {
        if (naziv === predmeti[i].predmet) {
          pronasao = predmeti[i].id;
          podaciZaPredavanja = predmeti[i].brojPredavanjaSedmicno;
          podaciZaVjezbe = predmeti[i].brojVjezbiSedmicno;
          //console.log('ovdje ',predmeti[i].id)
          break;
        }
      }
      if (pronasao) {
        Prisustvo.findAll({raw:true,
        where:{
          PredmetId: pronasao
        }
      }).then(data=>{
        var prisustva = data;
        
        for(let i = 0; i<prisustva.length; i++) {
          if(!studenti.includes(prisustva[i].index))
          studenti.push(prisustva[i].index);

        }
        Student.findAll({raw:true,
        where:{
          index: studenti
        }
      }).then(data=>{
         st = data;
objekat = {studenti:st,prisustva:prisustva,predmet:naziv,brojPredavanjaSedmicno:podaciZaPredavanja,brojVjezbiSedmicno:podaciZaVjezbe};
        //objekat.prisustva.push(prisustva)
        JSON.stringify(objekat);
        return res.send({ prisustva: objekat });
        //console.log('ovdje mi sve ispisi',objekat)
        //console.log('st',st)
      })
       // console.log('studenti',studenti)
         
      })

      //console.log('ovdje mi sve ispisi',objekat)
        //return res.send({ prisustva: pom });
      }
      //  else {
      //   return res.status(404).send({ poruka: "Doslo je do greske" });
      // }
    
  })
  //console.log('ovdje mi sve ispisi',objekat)
}
});

app.post("/prisustvo/predmet/:naziv/student/:index", function (req, res) {
  const { naziv, index } = req.params;
  const { sedmica, predavanja, vjezbe } = req.body.data;
  if (!req.session.username) {
    return res.status(400).send({ greska: "Nastavnik nije loginovan" });
  }
  fs.readFile("./data/prisustva.json", "utf-8", function (err, jsonString) {
    if (err) {
      // Error pusti da baci error na kraju
    } else {
      const predmeti = JSON.parse(jsonString);
      const pronasaoIndex = (predmeti || []).findIndex(
        (e) => naziv === e.predmet
      );
      if (pronasaoIndex === -1) {
        // Nije pronasao
      } else {
        const pronasaoIndexStudenta = (
          predmeti[pronasaoIndex]?.prisustva || []
        ).findIndex(
          (e) =>
            Number(e.index) === Number(index) &&
            Number(e.sedmica) === Number(sedmica)
        );
        if (pronasaoIndexStudenta === -1) {
          // Nije pronasao
        } else {
          predmeti[pronasaoIndex].prisustva[pronasaoIndexStudenta] = {
            sedmica: Number(sedmica),
            predavanja: Number(predavanja),
            vjezbe: Number(vjezbe),
            index: Number(index),
          };
          fs.writeFile(
            "./data/prisustva.json",
            JSON.stringify(predmeti),
            function (err) {
              if (err) {
                return res.status(404).send({ poruka: "Doslo je do greske" });
                // Error pusti da baci error na kraju
              }
            }
          );
          return res.send({ prisustva: predmeti[pronasaoIndex] });
        }
      }
    }
    return res.status(404).send({ poruka: "Doslo je do greske" });
  });
});

app.listen(PORT, () => {
  console.log("Started");
});
