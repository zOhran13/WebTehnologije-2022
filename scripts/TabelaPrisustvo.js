 
 
 let TabelaPrisustvo = function (divRef, podaci) {

  
divRef.innerHTML="";
    
document.write('<table>');
document.write("<th>" + 'Ime i prezime' + "</th>");
document.write("<th>" + 'Index' + "</th>");

for( i=1; i<=Object.values(podaci).length(); i++) {
    document.write( "<td" + i + "</td>" ); //pokusavam bilo sta sa objektom podaci
    
    
}
document.write('</table>');

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
    
  
 
    