import tasks from './tasks.json' assert { type: "json" };
import * as commander from 'commander';
const program = new commander.Command();
import * as fs from "fs";

let getAllTasks = () => {
    if(tasks.length===0) 
        console.log('No tasks available');
    else {
         tasks.forEach(task => {
        console.log(`Task ${task.id}: ${task.description}`);
        console.log(`Status: ${task.status}`)
        console.log(`Added: ${new Date(task.createdAt).toLocaleDateString()} ${new Date(task.createdAt).toLocaleTimeString()}`)
        console.log(`Last modified: ${new Date(task.updatedAt).toLocaleDateString()} ${new Date(task.createdAt).toLocaleTimeString()}`)
    })
   
    }
}

let getTasksByStatus = (status) => {
    let tasksByStatus = tasks.filter((task) => {
        if(task.status == status) {
            return true;
        }
    });

    if(tasksByStatus.length === 0) {
        console.log(`No ${status} tasks found`)
    }

    console.log(tasksByStatus)
}

let addTask = (description) => {
    
    
    try{
       let taskid = tasks.length === 0 ? 1: tasks[tasks.length-1].id + 1 
    
    let newTask = {
        id: taskid,
        description,
        status: "To do",
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON()
    }

    tasks.push(newTask);

    const newTaskList = JSON.stringify(tasks);

    fs.writeFileSync('tasks.json', newTaskList);
    console.log('Tasks added successfully');

    } catch(error) {
        console.log(error)
    }
    
    

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
            console.log('task status changed successfully')
        } else {
            console.log('Task not found, enter a different id')
        }
        
    } catch(error) {
        console.log(error)
    }
    
    
   
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
            tasks.splice(index,1);
            const deleted = JSON.stringify(tasks)
            fs.writeFileSync('tasks.json', deleted)
        } else {
            console.log('Task not found, enter a different id')
        }
        
    } catch (error) {
        
    }
}



let main = () => {


    program
    .command('view <status>')
    .description('View tasks')
    .action( (status) => {
       if(status === 'all'){
        getAllTasks();
       } else 
        getTasksByStatus(status)
    });

    program
    .command('add <description>')
    .description('Add task')
    .action((description) => {
        
            addTask(description)
        
        
    })

    program
    .command('change-status <id> <status>')
    .description('Change status of item')
    .action((id, status) => {
        let intId = Number.parseInt(id)
        changeStatus(intId, status);
    }) 

    program
    .command('update <id> <description>')
    .description('Update task')
    .action((id, description) => {
        updateTask(Number.parseInt(id), description);
    })

    program
    .command('delete <id>')
    .description('Delete a task')
    .action((id) => {
        deleteTask(Number.parseInt(id))
    })

   

    program.parse()
}

main();

