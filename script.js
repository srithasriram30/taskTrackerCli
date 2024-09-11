import tasks from './tasks.json' assert { type: "json" };
import * as fs from "fs";


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

let addTask = (task) => {
    try{
       
    
    let newTask = {
        id: tasks.length + 1,
        description: task,
        status: "To do",
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON()
    }

    tasks.push(newTask);

    const newTaskList = JSON.stringify(tasks);

    fs.writeFileSync('tasks.json', newTaskList);


    } catch(error) {
        console.log(error)
    }
    
    console.log('Tasks added successfully');

}

let changeStatus = (id, status) => {
    try{
        for(let i=0; i< tasks.length;i++){
            let task = tasks[i]
            if(task.id === id) {
                task.status = status,
                task.updatedAt= new Date().toJSON()
            }
        }
        const changedStatus = JSON.stringify(tasks);
        fs.writeFileSync('tasks.json', changedStatus);
    } catch(error) {
        console.log(error)
    }
    
    console.log('task status changed successfully')
   
}

changeStatus(1, 'Completed');
changeStatus(2, 'In progress');
getTasks();
