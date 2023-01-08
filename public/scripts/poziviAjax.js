const PoziviAjax = (() => {
  //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
  // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
  // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
  function impl_getPredmet(naziv, fnCallback) {
    const poziv = new XMLHttpRequest();
    poziv.onreadystatechange = () => {
      if (poziv.readyState === 4 && poziv.status === 200) {
        const odgovor = poziv.response;
        const json = JSON.parse(odgovor);
        fnCallback(json);
      } else {
        fnCallback(null);
      }
    };
    poziv.open("GET", `predmet/${naziv}`, true);
    poziv.setRequestHeader("Content-Type", "application/json");
    poziv.send();
  }

  // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
  function impl_getPredmeti(fnCallback) {
    const poziv = new XMLHttpRequest();
    poziv.onreadystatechange = () => {
      if (poziv.readyState === 4 && poziv.status === 200) {
        const odgovor = poziv.response;
        const json = JSON.parse(odgovor);
        fnCallback(json);
      } else {
        fnCallback(null);
      }
    };
    poziv.open("GET", "predmeti", true);
    poziv.setRequestHeader("Content-Type", "application/json");
    poziv.send();
  }

  function impl_postlogin(username, password, fnCallback) {
    const poziv = new XMLHttpRequest();
    poziv.onreadystatechange = () => {
      if (poziv.readyState !== 4) return;
      const odgovor = poziv.response;
      const json = JSON.parse(odgovor);
      if (poziv.status === 200) {
        fnCallback(null, json);
      } else {
        fnCallback(json, null);
      }
    };
    poziv.open("POST", "login", true);
    poziv.setRequestHeader("Content-Type", "application/json");
    poziv.send(JSON.stringify({ data: { username, password } }));
  }

  function impl_postlogout(fnCallback) {
    const poziv = new XMLHttpRequest();
    poziv.open("POST", "logout", true);
    poziv.setRequestHeader("Content-Type", "application/json");
    poziv.send();
    fnCallback();
  }

  //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
  function impl_postPrisustvo(
    naziv,
    index,
    tip,
    prisustvo,
    sedmica,
    trenutneVrijednosti,
    fnCallback
  ) {
    if (!prisustvo) {
      console.log("Nema prisustva");
    } else if (prisustvo === "prisutan") {
      const pronadjiTrenutneCifre = trenutneVrijednosti.prisustva.find(
        (e) =>
          Number(e.sedmica) === Number(sedmica) &&
          e.index.toString() === index.toString()
      );
      let noviBodyZaRequest = {
        ...pronadjiTrenutneCifre,
      };
      if (tip === "predavanja") {
        noviBodyZaRequest.predavanja = noviBodyZaRequest.predavanja - 1;
      }
      if (tip === "vjezbe") {
        noviBodyZaRequest.vjezbe = noviBodyZaRequest.vjezbe - 1;
      }
      const poziv = new XMLHttpRequest();
      poziv.onreadystatechange = () => {
        if (poziv.readyState === 4 && poziv.status === 200) {
          const odgovor = poziv.response;
          const json = JSON.parse(odgovor);
          fnCallback(json);
        } else {
          fnCallback(null);
        }
      };
      poziv.open("POST", `/prisustvo/predmet/${naziv}/student/${index}`, true);
      poziv.setRequestHeader("Content-Type", "application/json");
      poziv.send(
        JSON.stringify({
          data: {
            sedmica: noviBodyZaRequest.sedmica,
            predavanja: noviBodyZaRequest.predavanja,
            vjezbe: noviBodyZaRequest.vjezbe,
          },
        })
      );
    } else if (prisustvo === "odsutan") {
      const pronadjiTrenutneCifre = trenutneVrijednosti.prisustva.find(
        (e) =>
          Number(e.sedmica) === Number(sedmica) &&
          e.index.toString() === index.toString()
      );
      let noviBodyZaRequest = {
        ...pronadjiTrenutneCifre,
      };
      if (tip === "predavanja") {
        noviBodyZaRequest.predavanja = noviBodyZaRequest.predavanja + 1;
      }
      if (tip === "vjezbe") {
        noviBodyZaRequest.vjezbe = noviBodyZaRequest.vjezbe + 1;
      }
      console.log(
        noviBodyZaRequest,
        "pronadjiTrenutneCifre posalji na backend 2"
      );
      const poziv = new XMLHttpRequest();
      poziv.onreadystatechange = () => {
        if (poziv.readyState === 4 && poziv.status === 200) {
          const odgovor = poziv.response;
          const json = JSON.parse(odgovor);
          fnCallback(json);
        } else {
          fnCallback(null);
        }
      };
      poziv.open("POST", `/prisustvo/predmet/${naziv}/student/${index}`, true);
      poziv.setRequestHeader("Content-Type", "application/json");
      poziv.send(
        JSON.stringify({
          data: {
            sedmica: noviBodyZaRequest.sedmica,
            predavanja: noviBodyZaRequest.predavanja,
            vjezbe: noviBodyZaRequest.vjezbe,
          },
        })
      );
    }
  }

  return {
    postLogin: impl_postlogin,
    postLogout: impl_postlogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo,
  };
})();
