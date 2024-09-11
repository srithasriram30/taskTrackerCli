import tasks from './tasks.json' assert { type: "json" };

let getTasks = () => {
    console.log(tasks)
}

let getTasksByStatus = (status) => {
    let tasksByStatus = tasks.filter((task) => {
        if(task.status == status) {
            return true;
        }
    });

    console.log(tasksByStatus)
}

