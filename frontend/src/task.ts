interface task {
    id: number;
    texto: string;
    concluida: boolean;
};

let tarefas = [];
let proximoId = 1;

const novaTaskInput = document.getElementById('novaTarefa') as HTMLElement | null;
const listaTask = document.getElementById("listaTarefa") as HTMLElement | null;

function addTask(): void {
    const texto = novaTaskInput.value.trim();
}