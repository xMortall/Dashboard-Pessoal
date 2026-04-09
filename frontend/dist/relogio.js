"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relogio = document.getElementById('relogio');
const date = document.getElementById('date');
function atualizarRelogio() {
    const agora = new Date();
    if (relogio) {
        relogio.innerHTML = `${agora.toLocaleTimeString('pt-PT', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    }
}
//# sourceMappingURL=relogio.js.map