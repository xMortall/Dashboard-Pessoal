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

let intencao = ""
let estadoConversa = "Normal";

// Memotirização do estadoConversa das tarefas
let dados = {
    quantidadeTarefas: () => document.querySelectorAll(".task-item").length
}

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
    const _textoFormatado = _texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/,/g,"")
    .replace(/(.)\1+/g, "$1")
    .toLowerCase()
    .trim();
    
    return _textoFormatado;
}
function obterPalavras (_texto){
    const _textoNormalizado = normalizarTexto(_texto);
    return _textoNormalizado.split(" ")
}

function identificarIntencao(_texto){
    
    const _palavras = obterPalavras(_texto);
    intencao = "";

    let _grupos = {
        saudacao: ["ola", "oi","boas"],
        quantidade: ["quantas", "quantos", "listar", "mostrar"],
        tarefas: ["tarefas", "tarefa", "trabalho", "trabalhos", "atividades"],
        eliminar: ["excluir", "deletar", "remover", "apagar"],
        adicao: ["adicionar", "criar", "criar", "nova", "novo"]
    }


    const _temPalavra = (grupo) => {
        return _grupos[grupo].some(p => _palavras.includes(p));
    };

    if (estadoConversa == "precisa_detalhes_quantidade"){
        if(_temPalavra("tarefas")){
            intencao = "QuantidadeTarefas";
            estadoConversa = "Normal";
            return;
        }
    }
    
    else if(estadoConversa == "Normal"){
        if(_temPalavra("saudacao")){
            intencao = "Saudacao";
            return;
        }else if(_temPalavra("quantidade") && !_temPalavra("tarefas")){
            intencao = "PrecisaDetalhesQuantidade";
            estadoConversa = "precisa_detalhes_quantidade";
            return;
        }else if(_temPalavra("quantidade") && _temPalavra("tarefas")){
            intencao = "QuantidadeTarefas";
            estadoConversa = "Normal";
            return;
        }else{
            return;
        }
    }
 
}

function responderSaudacao(){
    let _resposta = "Ola, tudo bem?"
    return _resposta
}

function responderQuantidadeTarefas(){
    let _dados = dados.quantidadeTarefas();
    if (_dados == 0){
        return "Sem tarefas."
    }else if(_dados == 1){
        return "Uma tarefa."
    }else{
        return "Quantidade de tarefas: " + _dados;
    }
}

function responderPrecisaDetalhesQuantidade(_dados){
    let _resposta = "Precisa saber a quatidade todal de que?"
    return _resposta
}

function respostaIa(_pergunta){

    identificarIntencao(_pergunta);

    if (intencao){
        let nomeDaFuncao = "responder" + intencao;
        if (typeof window[nomeDaFuncao] === "function"){
            let _resposta = window[nomeDaFuncao]();
            return _resposta;
        }
    }
    
    return "Não entendi. Tente novamente."
}


submitPergunta.addEventListener("click", function() {
    let resposta = respostaIa(pergunta.value);
    responderIaHTML(pergunta, resposta);
});