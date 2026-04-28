async function pegarFrase(){
    frase = document.getElementById("fraseDia");
    
    try{
        resposta = await fetch("http://127.0.0.1:6767/api/frase",{
            method: "GET",
        });
        const data = await resposta.json();
        frase.innerHTML = data.frase;
    }catch(error){
        console.log(error);
    }
}

pegarFrase();