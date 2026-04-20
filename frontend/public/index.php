<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha DashBoard</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="frase_emocional_do_dia">
        <h1>"A vida é 10% o que acontece comigo e 90% como eu reajo a isso." - Charles R. Swindoll</h1>
    </div>
    <div class="imagem-cima">
        <img src="assets/imgs/imagem_banner.png" alt="imagem_de_cima">
    </div>
    <div class="container-cima">
        <div class="left-cima">
            <div class="cloack">
                <span id="horas">00</span>
                <span>:</span>
                <span id="minutos">00</span>
            </div>
            <div class="data">
                <span id="day">00</span>
                <span>/</span>
                <span id="month">00</span>
                <span>/</span>
                <span id="year">0000</span>
            </div>
        </div>
        <div class="right-cima">
            <div class="task-list">
                <div class="task-input">
                    <input type="text" id="novaTarefa" placeholder="Digite sua tarefa">
                    <button onclick="addTask()">Adicionar Tarefa</button>
                </div>
                <ul id="listaTarefa"></ul>
            </div>
        </div>
    </div>
    
    <!--Scripts-->
    <script src="assets/js/relogio.js"></script>
    <script src="assets/js/task.js"></script>

</body>
</html>