//  =========================================================
//  PROJET: Create Task
//  VERSION: 0.0.1
//  @AUTHOR: Emanuel Borges
//  DATA: 28/05/2023
//  =========================================================
//  *DESCRIPTION:
//  This script is a simple script that creates a task
//  and adds it to the list
//  =========================================================

let tasks = [];
let taskInput = document.getElementById("novaTarefa");
let listTask = document.getElementById("listaTarefa");

async function addTask(){
    const _taskText = taskInput.value.trim();

    if(!taskInput){return;}

    const _task = {
        name: _taskText,
        completed: false
    }

    try{
        resposta = await fetch("http://127.0.0.1:6767/api/tasks",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(_task),
        });
        if (!resposta.ok){
            const erro = await reposta.text();
            console.log("Erro:", erro)
            return;
        }
        const data = await resposta.json();

        _task.id = data.data.id;
        
        tasks.push(_task);
        createTaskItem(_task);
        taskInput.value = "";

    }catch(error){
        console.log(error);
    }

};

function createTaskItem(task){
    const _taskItem = document.createElement("li");
    _taskItem.className = "task-item";
    _taskItem.innerHTML = `<input type="checkbox" class="checkbox"> <span>${task.name}</span>
                            <button onclick="removeTask(this.parentNode)" class="remove-task">X</button>`;
    listTask.appendChild(_taskItem);
    return _taskItem;
}

function removeTask(task){
    listTask.removeChild(task);
}

async function get_task_db(){
    try{
        resposta = await fetch("http://127.0.0.1:6767/api/tasks",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (resposta.ok){
            const data = await resposta.json();
            for (let i = 0; i < data.length; i++){
                const _task = {
                    name: data[i].name,
                    completed: data[i].completed
                }
                tasks.push(_task);
                createTaskItem(_task);
            }
        }
        }catch (error){
            console.log(error);
        }
}