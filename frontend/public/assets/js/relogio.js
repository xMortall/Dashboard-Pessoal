function updateClock(){
    const _time = new Date();
    document.getElementById("horas").textContent = _time.getHours();
    document.getElementById("minutos").textContent = _time.getMinutes();
}

function updateDate(){
    document.getElementById("day").textContent = new Date().getDate();
    document.getElementById("month").textContent = new Date().getMonth() + 1;
    document.getElementById("year").textContent = new Date().getFullYear();
}

window.onload = function(){
    setInterval(updateClock, 1000);
    updateClock();
    updateDate();
}