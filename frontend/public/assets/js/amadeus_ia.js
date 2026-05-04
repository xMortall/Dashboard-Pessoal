/**
 * amateus_ia.js
 * @author Emanuel Borges
 * @version 0.0.1
 * @date 28/05/2023
 * 
 * @description 
 * This script is a simple script that creates a task
 */

const pergunta = document.querySelector(".pergunta");
const submitPergunta = document.querySelector(".submitPergunta");
const historico = document.querySelector("#historico");

let count = 0;
function responderIaHTML(_pergunta, _resposta) {

    const _texto = _pergunta.value.trim();

    if (!_pergunta.value){return;}
    if (!_texto){return;}

    // Minha pergunta
    const _divmensagem = document.createElement("div");
    _divmensagem.className = "divmensagem";
    const _nameUser = "Eu: ";
    const _mensagem = _pergunta.value;

    _divmensagem.innerHTML = `
    <p class="nameUser">${_nameUser}</p>
    <p class="mensagem">${_mensagem}</p>
    `


    // Ia resposta
    const _iadiv = document.createElement("div");
    _iadiv.className = "iadiv";
    const _nameIa = "amadeus: ";

    _iadiv.innerHTML = `
    <p class="nameIa">${_nameIa}</p>
    <p class="resposta">${_resposta}</p>
    `

    // divisor
    const divider = document.createElement("div");
    divider.innerHTML = `
    <p>_____________________________</p>
    `

    if (count >= 1){
        historico.appendChild(divider);
    }
    historico.appendChild(_divmensagem);
    historico.appendChild(_iadiv);
    count += 1;
    pergunta.value = "";
}

function normalizarTexto(_texto){
    const _texto_formatado = _texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    return _texto_formatado
}

function responderSaudacao(){
    let _resposta = "Ola, tudo bem?"
    return _resposta
}

function responderQuantidadeTarefas(_dados){
    let _resposta = "Você tem " + _dados + " tarefas"
    return _resposta
}

function respostaIa(){

    let _resposta = '';
    _texto = normalizarTexto(pergunta.value);

    let dados = {
        tarefas: document.querySelectorAll(".task-item"),
    };

    if (_texto.includes("ola") || _texto.includes("oi") ){
        _resposta = responderSaudacao();
    }else if (_texto.includes("quantas")){
        _resposta = responderQuantidadeTarefas(dados.tarefas.length);
    }else{
        _resposta = "Nao entendi"
    }
    return _resposta
}


submitPergunta.addEventListener("click", function() {
    let resposta = respostaIa();
    responderIaHTML(pergunta, resposta);
});