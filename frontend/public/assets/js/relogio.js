function updateClock(){
    const now = new Date();

    const horas = String(now.getHours()).padStart(2, "0");
    const minutos = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
}

function updateDate(){
    const now = new Date();

    document.getElementById("day").textContent = now.getDate();
    document.getElementById("month").textContent = now.getMonth() + 1;
    document.getElementById("year").textContent = now.getFullYear();
}

window.onload = function(){
    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
}