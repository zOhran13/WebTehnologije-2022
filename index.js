const express = require('express');
const bodyParser = require('body-parser'); 
const fs = require('fs');
//const session = require('express');
const app = express();
const rout = express.Router();
app.use(express.urlencoded({extended: true}));
app.use('/',rout);
const PORT = 3000
app.use(bodyParser.json());

 app.use(express.static('public'))
 app.use(express.static('./public/css'))
 app.use(express.static('./public/html'))
 app.use(express.static('./public/Ikonice'))
 app.use(express.static('./public/scripts'))

 app.get('/prisustvo',(req,res)=>{
    res.sendFile(__dirname + '/public/html/prisustvo.html')
 })
 app.get('/prijava',(req,res)=>{
    res.sendFile(__dirname + '/public/html/prijava.html')
 })
 app.get('/predmet',(req,res)=>{
    res.sendFile(__dirname + '/public/html/predmet.html')
 })
//  app.use(session({
//     secret: 'neka tajna sifra',
//     resave: true,
//     saveUninitialized: true
//     }));
    



 app.post('/login', function(req,res){
    
    // if(!tijelo) 
    //     return res.status(400).send({poruka: 'Something is wrong with body of request.'})
   
const username = req.body.useraname;
const password = req.body.password;
   if(!req.body.username || !req.body.password) return res.status(400).send({poruka: 'Neuspješna prijava'})

   let ima = false;
  fs.readFile('./data/nastavnici.json','utf-8',function(err,jsonString){
    if(err)
    return console.log(err);
    else{
        const nastavnici = JSON.parse(jsonString);
        for(let i = 0; i<nastavnici.lenght; i++) {
            //console.log(nastavnici[i])
            // username = req.session.username;
            // password = req.session.password;

            if(username===nastavnici[i].nastavnik.username && password===nastavnici[i].nastavnik.password_hash) {
                
            ima = true;
            break;
            }
        

        }
if(ima) 
    res.send({poruka: 'Uspješna prijava'})
    else
    res.status(404).send({poruka: 'Nema loging - Neuspješna prijava'})
    
            
        
    }
  })
 })

app.listen(PORT,()=>{
    console.log("Started")
});



