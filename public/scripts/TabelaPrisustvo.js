let TabelaPrisustvo = function (divRef, podaci) {
  var trenutnaSedmica = -1; //globalno
  var max = -2;
  let crtaj = function () {
    divRef.innerHTML = ""; //brise sadrzaj diva

    var x = document.createElement("P");

    var tekst;
    var validacija1 = 1;
    var validacija2 = 1;
    var validacija3 = 1;
    var validacija4 = 1;
    var validacija5 = 1;

    var prisustva = []; //izdvojena lista prisustva iz podataka
    Object.values(podaci).forEach((obj) => {
      if (obj instanceof Object) {
        Object.values(obj).forEach((temp) => {
          if (temp.hasOwnProperty("predavanja")) prisustva.push(temp);
        });
      }
    });
    var sedmiceUnesene = [
      ...new Set(prisustva.map((prisustvo) => prisustvo.sedmica)),
    ]; //lista sedmica

    var sedmice = sedmiceUnesene.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]), //uzeti samo po jednom brojevi sedmice
      []
    );
    max = sedmice[0];
    for (var i = 1; i < sedmice.length; i++) {
      if (sedmice[i] > max) max = sedmice[i]; //max broj sedmice
    }

    var brojSedmica = max;
    if (trenutnaSedmica == -1) {
      trenutnaSedmica = max; //samo prvi put ako se ne promjeni globalna trenutnaSedmica dole iz fj
    }

    //VALIDACIJA
    //vise unseno P ili V nego sto ima sedmicno i broj manji od nule
    for (var i = 0; i < prisustva.length; i++) {
      if (
        prisustva[i].vjezbe > podaci.brojVjezbiSedmicno ||
        prisustva[i].predavanja > podaci.brojPredavanjaSedmicno ||
        prisustva[i].vjezbe < 0 ||
        prisustva[i].predavanja < 0
      ) {
        x = document.createElement("P");
        tekst = document.createTextNode("Podaci o prisustvu nisu validni!");
        // x.document.createElement("P")
        x.appendChild(tekst);

        validacija1 = 0;
        break;
      }
    }

    //vise puna unseno prisustvo za istu sedmicu za istog studenta
    for (var i = 0; i < prisustva.length - 1; i++) {
      for (var j = i + 1; j < prisustva.length; j++) {
        if (
          prisustva[i].sedmica == prisustva[j].sedmica &&
          prisustva[i].index == prisustva[j].index
        ) {
          x = document.createElement("P");
          tekst = document.createTextNode("Podaci o prisustvu nisu validni!");

          x.appendChild(tekst);

          validacija2 = 0;
          break;
        }
      }
    }
    //vise studenata sa istim brojem indexa
    for (var i = 0; i < podaci.studenti.length - 1; i++) {
      for (var j = i + 1; j < podaci.studenti.length; j++) {
        if (podaci.studenti[i].index == podaci.studenti[j].index) {
          x = document.createElement("P");
          tekst = document.createTextNode("Podaci o prisustvu nisu validni!");
          x.appendChild(tekst);
          validacija3 = 0;
          break;
        }
      }
    }
    //unseno prisustvo za neki index koji nije u listi studenata
    for (var i = 0; i < prisustva.length; i++) {
      for (var j = 0; j < podaci.studenti.length; j++) {
        if (prisustva[i].index != podaci.studenti[j].index) validacija4 = -1;
        else {
          validacija4 = 1;
          break;
        }
      }
      if (validacija4 == -1) {
        x = document.createElement("P");
        tekst = document.createTextNode("Podaci o prisustvu nisu validni!");
        x.appendChild(tekst);
        break;
      }
    }
    //Ako nema ni jedan student neku izmedju sedmicu
    var unijeto = [...new Set(prisustva.map((prisustvo) => prisustvo.sedmica))];
    var brojeviSedmica = unijeto.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    );
    brojeviSedmica.sort();

    for (var i = 0; i < brojeviSedmica.length - 1; i++) {
      if (brojeviSedmica[i] + 1 != brojeviSedmica[i + 1]) validacija5 = 0;
      x = document.createElement("P");
      tekst = document.createTextNode("Podaci o prisustvu nisu validni!");
      x.appendChild(tekst);
      break;
    }

    if (
      validacija1 == 1 &&
      validacija2 == 1 &&
      validacija3 == 1 &&
      validacija4 == 1 &&
      validacija5 == 1
    ) {
      var naslov = document.createElement("h2");

      var pred = document.createTextNode(podaci.predmet);
      naslov.appendChild(pred);
      divRef.appendChild(naslov);

      var tabela = document.createElement("table");
      tabela.className = "mainTable";

      //zaglavlje tabele
      var zaglavlje = [
        "Ime i prezime",
        "Index",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
        "XIII",
        "XIV",
        "XV",
      ];
      var header = document.createElement("thead");
      header
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode(zaglavlje[0]));

      header
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode(zaglavlje[1]));

      for (var i = 0; i < brojSedmica; i++) {
        header
          .appendChild(document.createElement("th"))
          .appendChild(document.createTextNode(zaglavlje[i + 2]));
      }
      if (brojSedmica < zaglavlje.length) {
        var kraj = header
          .appendChild(document.createElement("th"))
          .appendChild(
            document.createTextNode(
              zaglavlje[2 + brojSedmica] + "-" + zaglavlje[zaglavlje.length - 1]
            )
          );
      }

      tabela.appendChild(header);

      var studenti = []; //izdvojena lista studenata
      Object.values(podaci).forEach((obj) => {
        if (obj instanceof Object) {
          Object.values(obj).forEach((temp) => {
            if (temp.hasOwnProperty("ime")) studenti.push(temp);
          });
        }
      });

      var predavanjaSedmicno = podaci.brojPredavanjaSedmicno;
      var vjezbiSedmicno = podaci.brojVjezbiSedmicno;

      studenti.forEach((student) => {
        var red = document.createElement("tr");
        var celija = document.createElement("td");
        var ime = document.createTextNode(student.ime);
        celija.appendChild(ime);
        red.appendChild(celija);

        celija = document.createElement("td");
        var index = document.createTextNode(student.index);
        celija.appendChild(index);
        red.appendChild(celija);
        //prosli kroz listu studenata i stavili ime i prezime za studenta u red

        var studentovaPrisustva = prisustva.filter(
          (prisustvo) =>
            prisustvo.index === student.index &&
            prisustvo.sedmica === trenutnaSedmica
        ); //prisustva za studenta na trenutnoj sedmici

        for (var k = 1; k <= brojSedmica; k++) {
          // dio tabele ako je trenutna sedmica
          if (k === trenutnaSedmica) {
            celija = document.createElement("td");

            celija.className = "prisustvo";
            var prviRed = document.createElement("tr");
            var drugiRed = document.createElement("tr");
            //dva reda za oznake predavanja i vjezbi i za boje prisustva
            for (var i = 0; i < predavanjaSedmicno; i++) {
              var celijaPredavanja = document.createElement("td");
              celijaPredavanja.className = "predavanja";
              var predavanja = document.createTextNode("P" + (i + 1));
              celijaPredavanja.appendChild(predavanja);
              prviRed.appendChild(celijaPredavanja);

              var prisustvoPredavanja = document.createElement("td");

              if (studentovaPrisustva.length == 0)
                prisustvoPredavanja.className = "nema";

              studentovaPrisustva.forEach((prisustvo) => {
                var bioNaP = prisustvo.predavanja;
                if (bioNaP == null) prisustvoPredavanja.className = "nema";
                else if (i >= 0 && i < bioNaP)
                  prisustvoPredavanja.className = "prisutan";
                else prisustvoPredavanja.className = "odsutan";
              });
              drugiRed.appendChild(prisustvoPredavanja);
            }
            for (var i = 0; i < vjezbiSedmicno; i++) {
              var celijaVjezbe = document.createElement("td");
              celijaVjezbe.className = "vjezbe";
              var vjezbe = document.createTextNode("V" + (i + 1));
              celijaVjezbe.append(vjezbe);
              prviRed.appendChild(celijaVjezbe);

              var prisustvoVjezbe = document.createElement("td");
              studentovaPrisustva.forEach((prisustvo) => {
                var bioNaV = prisustvo.vjezbe;

                if (bioNaV == null) prisustvoVjezbe.className = "nema";
                else if (i >= 0 && i < bioNaV)
                  prisustvoVjezbe.className = "prisutan";
                else prisustvoVjezbe.className = "odsutan";
              });
              drugiRed.appendChild(prisustvoVjezbe);
            }
            celija.appendChild(prviRed);
            celija.appendChild(drugiRed);
          } else {
            //postotak ako nije trenutna sedmica
            var sPris = prisustva.filter(
              (prisustvo) =>
                prisustvo.index === student.index && prisustvo.sedmica == k
            ); //studentova prisustva ako nije trenutna sedmica

            if (sPris.length == 0 && sPris.vjezbe == null) {
              celija = document.createElement("td");
            }
            if (sPris.length != 0) {
              sPris.forEach((prisustvo) => {
                var bioNaV = prisustvo.vjezbe;
                if (bioNaV == null) bioNaV = 0;
                var bioNaP = prisustvo.predavanja;
                if (bioNaP == null) bioNaP = 0;
                var pos =
                  ((bioNaP + bioNaV) /
                    (podaci.brojPredavanjaSedmicno +
                      podaci.brojVjezbiSedmicno)) *
                  100;
                var postotak = document.createTextNode(pos.toFixed(0) + "%");

                celija = document.createElement("td");
                celija.appendChild(postotak);
              });
            }
          }

          red.appendChild(celija);
          tabela.appendChild(red);
        }
      });

      divRef.appendChild(tabela); //na kraju dodamo tabelu na div

      //dodajmo ikone te te ikone dodamo na dugmad
      var d = divRef.appendChild(document.createElement("script"));
      d.setAttribute("src", "https://kit.fontawesome.com/04a4ec8674.js");
      d.setAttribute("crossorigin", "anonymous");
      var btn1 = document.createElement("button");
      var dugme1 = document.createElement("i");

      dugme1.setAttribute("class", "fa-solid fa-arrow-left fa-3x center");
      btn1.appendChild(dugme1);
      btn1.style = "margin-left:45%";
      btn1.onclick = function () {
        prethodnaSedmica();
      };
      divRef.appendChild(btn1);
      var btn2 = document.createElement("button");
      var dugme2 = document.createElement("i");
      dugme2.setAttribute("class", "fa-solid fa-arrow-right fa-3x center");
      btn2.appendChild(dugme2);
      btn2.style = "margin-right:43%";
      btn2.onclick = function () {
        sljedecaSedmica();
      }; //dodajmo na dugme fj onclick i sta ona poziva
      divRef.appendChild(btn2);
    } else {
      divRef.appendChild(x); // ukoliko validacija nije zadovoljena ispisujemo poruku na ekran
    }
    novaFunkcija();
  };

  let sljedecaSedmica = function () {
    if (trenutnaSedmica != max) {
      trenutnaSedmica++;
      crtaj();
      novaFunkcija();
    }
  };
  let prethodnaSedmica = function () {
    if (trenutnaSedmica > 1) {
      trenutnaSedmica--;
      crtaj();
      novaFunkcija();
    }
  };

  let novaFunkcija = () => {
    let nazivPredmeta = podaci?.predmet;
    let tabelaZaEdt = document.getElementsByClassName("mainTable");
    if (tabelaZaEdt[0].childNodes.length > 0) {
      tabelaZaEdt[0].childNodes.forEach((e, i) => {
        if (i === 0) {
          // preskociti ovo - header tabele
        } else {
          if (e.childNodes.length > 0) {
            let pronadjenIndex = -1;
            let indexStudenta;
            try {
              indexStudenta =
                e.childNodes.length > 1 ? e.childNodes[1].innerHTML : null;
            } catch (e) {
              indexStudenta = null;
            }
            e.childNodes.forEach((e2, i2) => {
              if (e2.childNodes.length === 2) {
                pronadjenIndex = i2;
              }
            });
            if (pronadjenIndex !== -1) {
              if (e.childNodes[pronadjenIndex].childNodes[1]) {
                let dataObj = [];
                e.childNodes[pronadjenIndex].childNodes[0].childNodes.forEach(
                  (el, i2) => {
                    if (el.className === "predavanja") {
                      dataObj.push({
                        x: i,
                        y: i2,
                        tip: "predavanja",
                        indexStudenta,
                        nazivPredmeta,
                      });
                    } else if (el.className === "vjezbe") {
                      dataObj.push({
                        x: i,
                        y: i2,
                        tip: "vjezbe",
                        indexStudenta,
                        nazivPredmeta,
                      });
                    }
                  }
                );
                e.childNodes[pronadjenIndex].childNodes[1].childNodes.forEach(
                  (el, i2) => {
                    const poveziElementSaPodacima = dataObj.find(
                      (element) => element.x === i && element.y === i2
                    );
                    // let noviButton = document.createElement("button");
                    el.onclick = () =>
                      // PoziviAjax.postPrisustvo(naziv, index, tip, prisustvo, fnCallback)
                      PoziviAjax.postPrisustvo(
                        poveziElementSaPodacima.nazivPredmeta,
                        poveziElementSaPodacima.indexStudenta,
                        poveziElementSaPodacima.tip,
                        el.className,
                        pronadjenIndex - 1,
                        podaci,
                        fnCallbackPredmet
                      );
                  }
                );
              }
            }
          }
        }
      });
    }
  };

  return {
    crtaj: crtaj,
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
  };
};
