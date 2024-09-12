import tasks from './tasks.json' assert { type: "json" };
import * as fs from "fs";


let getTasks = () => {
    tasks.forEach(task => {
        console.log(`Task ${task.id}: ${task.description}`);
        console.log(`Status: ${task.status}`)
        // console.log()
        // console.log()
    })
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
        id: tasks[tasks.length-1].id + 1,
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
        let index = -1
        for(let i=0; i< tasks.length;i++){
            let task = tasks[i]
            if(task.id === id) {
                task.status = status;
                task.updatedAt= new Date().toJSON();
                index = i;
                break;
            }
        }

        if(index !== -1) {
            const changedStatus = JSON.stringify(tasks);
            fs.writeFileSync('tasks.json', changedStatus);
        } else {
            console.log('Task not found, enter a different id')
        }
        
    } catch(error) {
        console.log(error)
    }
    
    console.log('task status changed successfully')
   
}

let updateTask = (id, update) => {
    try {
        let index = -1;
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if(task.id === id){
                task.description = update;
                task.updatedAt = new Date().toJSON();
                index = i;
                break;
            }
            
        }
        if(index !== -1) {
            const updated = JSON.stringify(tasks);
            fs.writeFileSync('tasks.json', updated)
        }  else {
            console.log('Task not found, enter a different id')
        }
    } catch (error) {
        console.log(error)
    }
}

let deleteTask = (id) => {
    try {
        let index = -1;
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if(task.id === id){
                index = i;
                break;
            }
            
        }
        if(index !==-1){
            let finalTasks = tasks.splice(index,1);
            const deleted = JSON.stringify(finalTasks)
            fs.writeFileSync('tasks.json', deleted)
        } else {
            console.log('Task not found, enter a different id')
        }
        
    } catch (error) {
        
    }
}

deleteTask(6)
getTasks();