const username = document.getElementById("username");
const password = document.getElementById("password");
const dugme = document.getElementById("login");

const popuni = (poruka, jeLiGreska) => {
  const div = document.getElementById("greska");
  div.innerHTML = poruka;
  if (jeLiGreska) {
    div.style.color = "red";
  } else {
    div.style.color = "green";
    window.location.replace("http://localhost:3000/predmeti.html");
  }
};

const fnCallback = (err, data) => {
  if (err) {
    popuni(err.poruka, true);
  } else {
    popuni(data.poruka, false);
    username.value = "";
    password.value = "";
  }
};

dugme.onclick = () => {
  if (!username?.value || !password?.value) {
    popuni("Neuspješna prijava", true);
    return;
  }
  PoziviAjax.postLogin(username.value, password.value, fnCallback);
};
