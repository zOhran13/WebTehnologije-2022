const express = require('express');
//const bodyParser = require('body-parser'); 
const app = express();
const rout = express.Router();
app.use('/',rout);
const PORT = 3000

 app.use(express.static('public'))
 app.use(express.static('./public/css'))
 app.use(express.static('./public/html'))
 app.use(express.static('./public/Ikonice'))
 app.use(express.static('./public/scripts'))

 

 rout.post('/login', function(req,res){
    let tijelo = req.body
    let imeKorisnika = tijelo.username
    let sifra = tijelo.password
 })
app.listen(PORT,()=>{
    console.log("Started")
});



