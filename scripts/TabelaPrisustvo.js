let TabelaPrisustvo = function (divRef, podaci) {
//$("divRef").empty();
  //divRef.innerHTML="";
    
  divRef.innerHTML = ''
     let x=document.createElement("P");
    let tekst;
    let validacija1=1;
    let validacija2=1;
    let validacija3=1;
    let validacija4=1;
    let validacija5=1;
     let prisustva = [];
         Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("predavanja"))
                    prisustva.push(temp)
                })
                
            }
        })
       //vise unseno P ili V nego sto ima sedmicno i broj manji od nule
for(let i = 0; i<prisustva.length; i++) {
    
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
for(let i=0; i<prisustva.length-1; i++) {
   for(let j=i+1; j<prisustva.length; j++) {
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
for(let i=0; i<podaci.studenti.length-1; i++) {
    for(let j=i+1; j<podaci.studenti.length; j++ ){
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
for(let i=0; i<prisustva.length; i++) {
    for(let j=0; j<podaci.studenti.length; j++) {
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
let unijeto=[...new Set(prisustva.map(prisustvo => prisustvo.sedmica))]
let brojeviSedmica = unijeto.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    [],
  );
  brojeviSedmica.sort();
 // console.log(brojeviSedmica)

  for(let i=0; i<brojeviSedmica.length-1; i++) {
    if(brojeviSedmica[i]+1!=brojeviSedmica[i+1]) validacija5=0;
    x=document.createElement("P");
        tekst=document.createTextNode("Podaci o prisustvu nisu validni!");
        x.appendChild(tekst);
         break;
  }


  if(validacija1==1 && validacija2==1 && validacija3==1 && validacija4==1 && validacija5==1) {
  
        let tabela=document.createElement('table'); 
        tabela.className = "mainTable"
       
       
        
        // let nijeUneseno = [];
        // Object.values(podaci).forEach(obj => {
        //     if(obj instanceof Object) {
        //         Object.values(obj).forEach(temp => {
        //             if(temp.hasOwnProperty("sedmica"))
        //             nijeUneseno.push(temp)
        //         })
                
        //     }
        // })
        let sedmiceUnesene = [...new Set(prisustva.map(prisustvo => prisustvo.sedmica))]; 
       // let sedmiceNisuUnesene = [...new Set(nijeUneseno.map(prisustvo => prisustvo.sedmica))]
        let sedmice = sedmiceUnesene.reduce(
            (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
            [],
          );
          let max=sedmice[0];
          for(let i=1; i<sedmice.length; i++) {
            if(sedmice[i]>max) max=sedmice[i];
          }
          //console.log(sedmiceNisuUnesene)
          //console.log(sedmiceUnesene)
         // console.log(sedmice)
         //console.log(max);

        let brojSedmica = max;
        let trenutnaSedmica = max;
       // console.log(trenutnaSedmica)

        let zaglavlje = ['Ime i prezime', 'Index', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
        var header = document.createElement('thead')
        header.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(zaglavlje[0]));

        header.appendChild(document.createElement("th")).
        appendChild(document.createTextNode(zaglavlje[1]));

        for (let i=0; i<brojSedmica; i++) {
            header.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(zaglavlje[i+2]));
        }
        if(brojSedmica < zaglavlje.length) {
          let kraj=  header.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(zaglavlje[2 + brojSedmica] + "-" + zaglavlje[zaglavlje.length-1]));
         
        }
       
        tabela.appendChild(header);

        let studenti = []
        Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("ime"))
                    studenti.push(temp)
                })
                
            }
        })
        
       
        let predavanjaSedmicno = podaci.brojPredavanjaSedmicno;
        let vjezbiSedmicno = podaci.brojVjezbiSedmicno;

        studenti.forEach(student => {
            let red = document.createElement("tr");
            let celija = document.createElement("td");
            let ime = document.createTextNode(student.ime);
            celija.appendChild(ime);
            red.appendChild(celija);

            celija = document.createElement("td");
            let index = document.createTextNode(student.index)
            celija.appendChild(index);
            red.appendChild(celija);
            

            let studentovaPrisustva = prisustva.filter(prisustvo => prisustvo.index === student.index && prisustvo.sedmica === trenutnaSedmica)
           console.log(studentovaPrisustva)
            
            
            for(let k = 1; k <= brojSedmica; k++) {
                
            if(k  === trenutnaSedmica) {
            celija = document.createElement("td");

            celija.className = "prisustvo"
            let prviRed = document.createElement('tr')
            let drugiRed = document.createElement('tr')

            for(let i = 0; i < predavanjaSedmicno; i++) {
                let celijaPredavanja = document.createElement("td")
                celijaPredavanja.className="predavanja"
                let predavanja = document.createTextNode("P"  +(i+1))
                celijaPredavanja.appendChild(predavanja)
                prviRed.appendChild(celijaPredavanja)
            
                let prisustvoPredavanja = document.createElement("td")

                if(studentovaPrisustva.length==0) prisustvoPredavanja.className="nema";
                
                studentovaPrisustva.forEach(prisustvo => {
                        let bioNaP = prisustvo.predavanja;
                        //let imaLi=0;
                        //if(bioNaP>=1)  imaLi=1;
                        //console.log(bioNaP)
                        //if(imaLi===0)
                        //prisustvoPredavanja.className = "nema"
                        
                        if (i >= 0 && i < bioNaP)
                        prisustvoPredavanja.className = "prisutan"
                        else 
                        prisustvoPredavanja.className = "odsutan"
                })
                drugiRed.appendChild(prisustvoPredavanja)

            }
            for(let i = 0; i < vjezbiSedmicno; i++) {
                let celijaVjezbe = document.createElement("td")
                celijaVjezbe.className="vjezbe"
                let vjezbe = document.createTextNode("V" + (i+1))
                celijaVjezbe.append(vjezbe)
                prviRed.appendChild(celijaVjezbe)

                let prisustvoVjezbe = document.createElement("td")
                studentovaPrisustva.forEach(prisustvo => {
                    let bioNaV = prisustvo.vjezbe
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
        else if(k<trenutnaSedmica && k!=0) {
            //postotak
            let sPris =  prisustva.filter(prisustvo => prisustvo.index === student.index && prisustvo.sedmica==k)//ovdje popravit
            //console.log(sPris)
            if(sPris.length!=0) {
            sPris.forEach(prisustvo => {
                let bioNaV = prisustvo.vjezbe
                //console.log(bioNaV)
                let bioNaP=prisustvo.predavanja  
            let postotak = document.createTextNode(((bioNaP+bioNaV)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))*100+'%');
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

    function sljedecaSedmica() {
    }
    let prethodnaSedmica = function () {
    }
    return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica
    
   
    

    }


    
    };
   /* export {
        TabelaPrisustvo
    };
   */
    
  
 
    