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

function addTask(){
    const _taskText = taskInput.value.trim();

    if(!taskInput){return;}
    if(!_taskText){return;}

    const _task = {
        name: _taskText,
        completed: false
    }
    tasks.push(_task);
    createTaskItem(_task);
    taskInput.value = "";
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

