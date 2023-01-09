const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

const app = express();
const fs = require("fs");
const session = require("express-session");
const rout = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use("/", rout);
const PORT = 3000;
app.use(bodyParser.json());

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
app.post("/login", function (req, res) {
  if (!req.body.data.username || !req.body.data.password)
    return res
      .status(400)
      .send({ poruka: "Something is wrong with body of request." });

  const username = req.body.data.username;
  const password = req.body.data.password;

  
  fs.readFile("./data/nastavnici.json", "utf-8",async function (err, jsonString) {
    if (err) {
      return console.log(err);
    } else {
      const nastavnici = JSON.parse(jsonString);
     // const saltRounds = 10;
      for (let i = 0; i < nastavnici.length; i++) {
        
      
        if (username === nastavnici[i].nastavnik.username ) {
          
              const result = await bcrypt.compare(password, nastavnici[i].nastavnik.password_hash);
                
          
             if(result) {
              pr=1;
              pronasao = nastavnici[i];
              console.log('Ovdje mi je pr',pr)
              
              }
        
        }

         console.log('Ovdje sam',pr)
         if(pr){
console.log('ovdje je username ovaj',username)
            break;
          }
          pr=null;
      }
      
     // console.log('Ovdje sam pronasao',pronasao)

      if (pronasao) {
        session.username = username;
        session.predmeti = JSON.stringify(pronasao.predmeti);
        pronasao = null;
        return res.send({ poruka: "Uspješna prijava" });
      } else {
        return res
          .status(404)
          .send({ poruka: "Neuspješna prijava" });
      }
    }
  });
});

app.post("/logout", function (req, res) {
  session.username = null;
  session.predmeti = null;
});

app.get("/predmeti", function (req, res) {
  if (session.username === "") {
    return res.status(400).send({ greska: "Nastavnik nije loginovan" });
  }
  return res.send({ predmeti: JSON.parse(session.predmeti) });
});

app.get("/predmet/:naziv", function (req, res) {
  const { naziv } = req.params;
  fs.readFile("./data/prisustva.json", "utf-8", function (err, jsonString) {
    if (session.username === "") {
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
  if (session.username === "") {
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
