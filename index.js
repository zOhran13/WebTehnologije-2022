const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('./baza.js');

const Nastavnik = require('./models/Nastavnik.js')(sequelize);
const Predmet = require('./models/Predmet.js')(sequelize);

Nastavnik.hasMany(Predmet, {as: 'idNastavnik', onDelete: 'CASCADE'})
Nastavnik.sync()
Predmet.sync()

// Nastavnik.bulkCreate([
//   { username: "USERNAME", password_hash: "$2a$10$zbiZcjIcPDf2w4YwyEs1kOtEJDfIg0cntTcAVYt4pewxpgbN5Zyxy" },
//   { username: "USERNAME2", password_hash: "$2a$10$eExVBRbzxnEskStm2MWc9edOfVzfEF.95sn5Lmwp3hO3aVT.JDzz." },
//   { username: "USERNAME3", password_hash: "$2a$10$xuwn4EXCopjpV9U52DsCA.k4mftwwD2pPMs.mnrzL8sSZxrN5lzEC" },
// ],{
//   ignoreDuplicates: true,
// }
// ).then(() => console.log("Users data have been saved"));

// Predmet.bulkCreate([
//   {NastavnikId:"1", predmeti: "PREDMET1"},
//   {NastavnikId:"2", predmeti:"PREDMET2"},
//   {NastavnikId:"3", predmeti:"PREDMET3"}
// ])

const app = express();
const fs = require("fs");
const session = require("express-session");
const rout = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use("/", rout);
const PORT = 3000;
app.use(bodyParser.json());
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
              temp.push(element.predmeti)

              
            });

            req.session.predmeti = JSON.stringify(temp);
            req.session.save();

console.log('ovdje predmeti',req.session)
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
  console.log('evo nas',req.session)
  return res.send({ predmeti: JSON.parse(req.session.predmeti)});
});

app.get("/predmet/:naziv", function (req, res) {
  const { naziv } = req.params;
  fs.readFile("./data/prisustva.json", "utf-8", function (err, jsonString) {
    if (!req.session.username) {
      return res.status(400).send({ greska: "Nastavnik nije loginovan" });
    } else if (err) {
      return res.status(404).send({ poruka: "Doslo je do greske" });
    } else {
      const predmeti = JSON.parse(jsonString);
      let pronasao = false;
      for (let i = 0; i < predmeti.length; i++) {
        if (naziv === predmeti[i].predmet) {
          pronasao = predmeti[i];
          break;
        }
      }
      if (pronasao) {
        return res.send({ prisustva: pronasao });
      } else {
        return res.status(404).send({ poruka: "Doslo je do greske" });
      }
    }
  });
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
