const relogio = document.getElementById('relogio') as HTMLDivElement | null;
const date = document.getElementById('date') as HTMLDivElement | null;

function atualizarRelogio(): void {
    const agora = new Date();
    if (relogio) {
        relogio.innerHTML = `${agora.toLocaleTimeString('pt-PT', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    }
}