async function loadTasks(){
    const res = await fetch("http://127.0.0.1:6767/api/tasks");
    const data = await res.json();

    console.log(data);
}

loadTasks();