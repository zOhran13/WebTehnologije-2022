const predmeti = document.getElementById("predmeti");

window.onload = () => {
  PoziviAjax.getPredmeti(fnCallbackPredmeti);
  
};

const fnCallbackPredmeti = (predmetiResponse) => {
  let meniGeneration = document.getElementById("predmeti");
  (predmetiResponse?.predmeti || []).forEach((el) => {
    let novaOpcija = document.createElement("li");
    let noviButton = document.createElement("button");
    noviButton.innerHTML = el;
    noviButton.onclick = () => PoziviAjax.getPredmet(el, fnCallbackPredmet);
    novaOpcija.appendChild(noviButton);
    meniGeneration.appendChild(novaOpcija);
  });
};

const fnCallbackPredmet = (predmetResponse) => {
  let div = document.getElementById("divSadrzaj");
  if (predmetResponse?.prisustva) {
    let prisustvo = TabelaPrisustvo(div, predmetResponse?.prisustva);
    prisustvo.crtaj();
  } else {
    div.innerHTML = ""; //brise sadrzaj diva
  }
};

const fnCallbackLogout = () => {
  window.location.replace("http://localhost:3000/prijava.html");
};

logoutButton.onclick = () => {
  PoziviAjax.postLogout(fnCallbackLogout);
};
