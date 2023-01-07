const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
    }
    function impl_postLogin(username,password,fnCallback){
        const poziv = new XMLHttpRequest();
        poziv.onreadystatechange = () => {
            if(poziv.readyState!==4) return;
            const odgovor = poziv.response;
            const json = JSON.parse(odgovor);
            if(poziv.status===200) {
                fnCallback(null,json);
            }else{
                fnCallback(json,null);
            }
        }
        poziv.open('POST','login',true);
        poziv.setRequestHeader('Contet-Type','application/json');
        poziv.send(JSON.stringify({username: username, password: password}));
    }
    function impl_postLogout(fnCallback){
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo
    };
    })();
    