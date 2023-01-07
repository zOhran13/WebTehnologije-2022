const username = document.getElementById('useraname')
const password = document.getElementById('password')
const popuni = (poruka,jeLiGreska) =>{
    const div = document.getElementById('greska')
    div.innerHTML=poruka;
    if(jeLiGreska) {
        div.style.color='red';
    }
    else{
        div.style.color='green';
    }
}
const fnCallback = (err,data) =>{
    if(err) {
        popuni(err.poruka,true);
        //console.log(1);
    }else{
        popuni(data.poruka,false);
        username.value='';
        password.value='';
    }
}
const dugme = document.getElementById('login');
dugme.onclick = () =>{
    if(!username.value || !password.value){
        popuni('Nema sadrzaja',true);
        return;
    }
    console.log(username);
    PoziviAjax.postLogin(username.value,password.value,fnCallback);
}