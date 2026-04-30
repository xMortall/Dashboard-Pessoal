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

    if(!_taskText){return;}

    const _task = {
        name: _taskText,
        completed: false
    }

    try{
        const resposta = await fetch("http://127.0.0.1:6767/api/tasks",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(_task),
        });
        if (!resposta.ok){
            const erro = await resposta.text();
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
    _taskItem.innerHTML = `<input type="checkbox" ${task.completed ? "checked" : ""} id="${task.id}" class="checkbox"> <span>${task.name}</span>
                            <button type="remove-task" class="remove-task">X</button>`;
    
    const checkbox = _taskItem.querySelector(".checkbox");
    const removeButton = _taskItem.querySelector(".remove-task");

    removeButton.addEventListener("click", () => {
        removeTask(task.id, _taskItem);
    });

    checkbox.addEventListener("change", () => {
        updateTask(task.id, checkbox.checked ? 1 : 0);
    });
    
    listTask.appendChild(_taskItem);
    return _taskItem;
}

async function updateTask(id, completed){
    try{
        const resposta = await fetch(`http://127.0.0.1:6767/api/tasks/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({completed: completed})
        });
    }catch(error){
        console.log(error);
    }
}

async function removeTask(id, task){

    try{
        const resposta = await fetch(`http://127.0.0.1:6767/api/tasks/${id}`,{
            method: "DELETE"
        });

        if (!resposta.ok){
            const erro = await resposta.text();
            console.log("Erro:", erro)
            return;
        }
        listTask.removeChild(task);
        

    }catch(error){
        console.log(error);
    }

}

async function get_task_db(){
    try{
        resposta = await fetch("http://127.0.0.1:6767/api/tasks",{
            method: "GET"
        });
        
        const data = await resposta.json();
        
        if (resposta.ok){
            data.data.forEach(_task => {
                _task.completed = Boolean(_task.completed);
                createTaskItem(_task);
            });
        };


    }catch (error){
        console.log(error);
    }
}

get_task_db();