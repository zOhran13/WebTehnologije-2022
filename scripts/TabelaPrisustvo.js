let TabelaPrisustvo = function (divRef, podaci) {
//$("divRef").empty();
  //divRef.innerHTML="";
    
  divRef.innerHTML = ''
  
     var x=document.createElement("P");
    
    var tekst;
     var validacija1=1;
     var validacija2=1;
    var validacija3=1;
    var validacija4=1;
    var validacija5=1;
     var prisustva = [];
         Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("predavanja"))
                    prisustva.push(temp)
                })
                
            }
        })
        var sedmiceUnesene = [...new Set(prisustva.map(prisustvo => prisustvo.sedmica))]; 
       // let sedmiceNisuUnesene = [...new Set(nijeUneseno.map(prisustvo => prisustvo.sedmica))]
        var sedmice = sedmiceUnesene.reduce(
            (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
            [],
          );
          var max=sedmice[0];
          for(var i=1; i<sedmice.length; i++) {
            if(sedmice[i]>max) max=sedmice[i];
          }
         

        var brojSedmica = max;
        var trenutnaSedmica = max;
        console.log(trenutnaSedmica)
       //vise unseno P ili V nego sto ima sedmicno i broj manji od nule
for(var i = 0; i<prisustva.length; i++) {
    
    if(prisustva[i].vjezbe>podaci.brojVjezbiSedmicno || prisustva[i].predavanja>podaci.brojPredavanjaSedmicno || prisustva[i].vjezbe<0 || prisustva[i].predavanja<0) {    
        x=document.createElement("P");
    tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
   // x.document.createElement("P")
    x.appendChild(tekst);
    
    validacija1=0;
    break;
}
}

//vise puna unseno prisustvo za istu sedmicu za istog studenta
for(var i=0; i<prisustva.length-1; i++) {
   for(var j=i+1; j<prisustva.length; j++) {
        if((prisustva[i].sedmica==prisustva[j].sedmica && prisustva[i].index==prisustva[j].index) ) {
            x=document.createElement("P");
    tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
   // x.document.createElement("P")
    x.appendChild(tekst);
   
    validacija2=0;
    break;
        }
        
        
    }   
 
     
}
//vise studenata sa istim brojem indexa
for(var i=0; i<podaci.studenti.length-1; i++) {
    for(var j=i+1; j<podaci.studenti.length; j++ ){
    if(podaci.studenti[i].index==podaci.studenti[j].index) {
        x=document.createElement("P");
        tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
        x.appendChild(tekst);
        validacija3=0;
        break;
    }
}
}
//unseno prisustvo za neki index koji nije u listi studenata
for(var i=0; i<prisustva.length; i++) {
    for(var j=0; j<podaci.studenti.length; j++) {
        if(prisustva[i].index!=podaci.studenti[j].index) validacija4=-1;
        else {
            validacija4=1;
            break;
        }
       
    }
    if(validacija4==-1){
        x=document.createElement("P");
        tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
        x.appendChild(tekst);
         break;
    }
}
//Ako nema ni jedan student neku izmedju sedmicu
var unijeto=[...new Set(prisustva.map(prisustvo => prisustvo.sedmica))]
var brojeviSedmica = unijeto.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    [],
  );
  brojeviSedmica.sort();
 // console.log(brojeviSedmica)

  for(var i=0; i<brojeviSedmica.length-1; i++) {
    if(brojeviSedmica[i]+1!=brojeviSedmica[i+1]) validacija5=0;
    x=document.createElement("P");
        tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
        x.appendChild(tekst);
         break;
  }


  if(validacija1==1 && validacija2==1 && validacija3==1 && validacija4==1 && validacija5==1) {
        var naslov = document.createElement("h2");
       // console.log(podaci.predmet)
        var pred = document.createTextNode(podaci.predmet)
        naslov.appendChild(pred)
        divRef.appendChild(naslov)
  
        var tabela=document.createElement('table'); 
        tabela.className = "mainTable"
       
       
        
        
       // console.log(trenutnaSedmica)

        var zaglavlje = ['Ime i prezime', 'Index', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
        var header = document.createElement('thead')
        header.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(zaglavlje[0]));

        header.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(zaglavlje[1]));

        for (var i=0; i<brojSedmica; i++) {
            header.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(zaglavlje[i+2]));
        }
        if(brojSedmica < zaglavlje.length) {
          var kraj=  header.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(zaglavlje[2 + brojSedmica] + "-" + zaglavlje[zaglavlje.length-1]));
         
        }
       
        tabela.appendChild(header);

        var studenti = []
        Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("ime"))
                    studenti.push(temp)
                })
                
            }
        })
        
       
        var predavanjaSedmicno = podaci.brojPredavanjaSedmicno;
        var vjezbiSedmicno = podaci.brojVjezbiSedmicno;

        studenti.forEach(student => {
            var red = document.createElement("tr");
            var celija = document.createElement("td");
            var ime = document.createTextNode(student.ime);
            celija.appendChild(ime);
            red.appendChild(celija);

            celija = document.createElement("td");
            var index = document.createTextNode(student.index)
            celija.appendChild(index);
            red.appendChild(celija);
            

            var studentovaPrisustva = prisustva.filter(prisustvo => prisustvo.index === student.index && prisustvo.sedmica === trenutnaSedmica)
           //console.log(studentovaPrisustva)
            //console.log(brojSedmica)
            
            for(var k = 1; k <= brojSedmica; k++) {
                
            if(k  === trenutnaSedmica) {
            celija = document.createElement("td");

            celija.className = "prisustvo"
            var prviRed = document.createElement('tr')
            var drugiRed = document.createElement('tr')

            for(var i = 0; i < predavanjaSedmicno; i++) {
                var celijaPredavanja = document.createElement("td")
                celijaPredavanja.className="predavanja"
                var predavanja = document.createTextNode("P"  +(i+1))
                celijaPredavanja.appendChild(predavanja)
                prviRed.appendChild(celijaPredavanja)
            
                var prisustvoPredavanja = document.createElement("td")

                if(studentovaPrisustva.length==0) prisustvoPredavanja.className="nema";
                
                studentovaPrisustva.forEach(prisustvo => {
                        var bioNaP = prisustvo.predavanja;
                      
                        
                        if (i >= 0 && i < bioNaP)
                        prisustvoPredavanja.className = "prisutan"
                        else 
                        prisustvoPredavanja.className = "odsutan"
                })
                drugiRed.appendChild(prisustvoPredavanja)

            }
            for(var i = 0; i < vjezbiSedmicno; i++) {
                var celijaVjezbe = document.createElement("td")
                celijaVjezbe.className="vjezbe"
                var vjezbe = document.createTextNode("V" + (i+1))
                celijaVjezbe.append(vjezbe)
                prviRed.appendChild(celijaVjezbe)

                var prisustvoVjezbe = document.createElement("td")
                studentovaPrisustva.forEach(prisustvo => {
                    var bioNaV = prisustvo.vjezbe
                    //if(Object.values(studentovaPrisustva)===0)
                   // prisustvoVjezbe.className = "nema";
                    if(i >= 0 && i < bioNaV)
                    prisustvoVjezbe.className = "prisutan"
                    else 
                    prisustvoVjezbe.className = "odsutan"
            })
                drugiRed.appendChild(prisustvoVjezbe)
        }
        celija.appendChild(prviRed) 
        celija.appendChild(drugiRed) 
    }
        else  {
            //postotak
            var sPris =  prisustva.filter(prisustvo => prisustvo.index === student.index && prisustvo.sedmica==k)//ovdje popravit
            //console.log(sPris)
            if(sPris.length==0) {
                celija = document.createElement("td"); 

            }
            if(sPris.length!=0) {
            sPris.forEach(prisustvo => {
                var bioNaV = prisustvo.vjezbe
                //console.log(bioNaV)
                var bioNaP=prisustvo.predavanja  
            var postotak = document.createTextNode(((bioNaP+bioNaV)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))*100+'%');
            //console.log(postotak);
           celija = document.createElement("td");
          celija.appendChild(postotak);
            })
        }
        
        }

        red.appendChild(celija)
        tabela.appendChild(red);
        }
        })
      
        divRef.appendChild(tabela);

       

        
  
    }
    else {
        divRef.appendChild(x);
    }

    let dugmadi = function() {
        var d=divRef.appendChild(document.createElement('script'))
   d.setAttribute("src", "https://kit.fontawesome.com/04a4ec8674.js")   
   d.setAttribute("crossorigin", "anonymous")  
   var btn1 = document.createElement("button")
  var dugme1 = document.createElement("i")
  //divRef.appendChild(dugme1);
  dugme1.setAttribute("class", "fa-solid fa-arrow-left fa-3x center")
 //dugme1.className="dugme1"
 btn1.appendChild(dugme1)
 btn1.style="margin:10px"
 btn1.addEventListener("click", prethodnaSedmica)
  divRef.appendChild(btn1)
  var btn2=document.createElement("button")
  var dugme2 = document.createElement("i")
  dugme2.setAttribute("class", "fa-solid fa-arrow-right fa-3x center")
  btn2.appendChild(dugme2)
  btn2.style="margin:10px"
  btn2.addEventListener("click", sljedecaSedmica)
  divRef.appendChild(btn2)
  
 
    }
    

    let sljedecaSedmica = function () {
        
        if(trenutnaSedmica<max) {
             // console.log(trenutnaSedmica) 
         trenutnaSedmica=trenutnaSedmica+1;
       
        }

    }
    let prethodnaSedmica = function () {
        if(trenutnaSedmica>1) {
        
         trenutnaSedmica=trenutnaSedmica-1; 
        
        }
    }
    return {
        
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
    dugmadi:dugmadi

    }
    };
   /* export {
        TabelaPrisustvo
    };
   */
    
  
 
    