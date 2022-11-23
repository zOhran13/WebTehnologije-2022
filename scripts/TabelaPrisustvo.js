let TabelaPrisustvo = function (divRef, podaci) {
//$("divRef").empty();
  //divRef.innerHTML="";
    
  divRef.innerHTML = ''
        let tabela=document.createElement('table'); 
        tabela.className = "mainTable"
       
        let prisustva = [];
         Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("predavanja"))
                    prisustva.push(temp)
                })
                
            }
        })
        
        let nijeUneseno = [];
        Object.values(podaci).forEach(obj => {
            if(obj instanceof Object) {
                Object.values(obj).forEach(temp => {
                    if(temp.hasOwnProperty("sedmica"))
                    nijeUneseno.push(temp)
                })
                
            }
        })
        let sedmiceUnesene = [...new Set(prisustva.map(prisustvo => prisustvo.sedmica))]; 
        let sedmiceNisuUnesene = [...new Set(nijeUneseno.map(prisustvo => prisustvo.sedmica))]
        let sedmice = sedmiceUnesene.concat(sedmiceNisuUnesene).reduce(
            (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
            [],
          );
          //console.log(sedmiceNisuUnesene)
          //console.log(sedmiceUnesene)
         // console.log(sedmice)

        let brojSedmica = sedmice.length;
        let trenutnaSedmica = brojSedmica;

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
        let predmet = ""
       /* Object.values(podaci).forEach(obj => {
            if(!(obj instanceof Object) && typeof obj === "string") {
                predmet = obj
            }
        })*/
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
            //console.log(studentovaPrisustva)
            
            
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
                studentovaPrisustva.forEach(prisustvo => {
                        let bioNaP = prisustvo.predavanja;
                        if(i >= 0 && i < bioNaP)
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
            let sPris =  prisustva.filter(prisustvo => prisustvo.index === student.index && prisustvo.sedmica === k)
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

        red.appendChild(celija)
        tabela.appendChild(red);
        }
        })
      
        divRef.appendChild(tabela);
        
  



/*document.write('</table>');
        
    let tabela=document.write('<table>'); 
    //let zaglavlje = ['Ime i prezime', 'Index'];
    podaci.forEach(s => {
        let red = document.createElement("tr");
        Object.values(s).forEach(text => {
            let celija = document.createElement("td");
            let t = document.createTextNode(text);
            celija.appendChild(t);
            red.appendChild(celija);
        })
        tabela.appendChild(red);

        
    });
    divRef.appendChild(tabela);*/
    
   

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
    
  
 
    