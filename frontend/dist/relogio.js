function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('horas').textContent = hours;
    document.getElementById('minutos').textContent = minutes;
}
function updateDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString(); // Ano não precisa
    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;
    document.getElementById('year').textContent = year;
}
setInterval(updateClock, 1000);
updateClock();
updateDate();
export {};
//# sourceMappingURL=relogio.js.map