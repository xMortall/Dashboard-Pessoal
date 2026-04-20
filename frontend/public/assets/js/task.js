/**
 * 
 * 
 * 
 */

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
    _taskItem.innerHTML = `<input type="checkbox" class="checkbox"> <span>${task.name}</span>`;
    listTask.appendChild(_taskItem);
    return _taskItem;
}

function removeTask(task){

}

