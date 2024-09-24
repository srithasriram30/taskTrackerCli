# Task Tracker

This is my sample [solution](https://github.com/srithasriram30/taskTrackerCli) for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from roadmap.sh

# Prerequsites

Node and npm is required to run this package.

# Installation

Use the following commands to install

`
git clone https://github.com/srithasriram30/taskTrackerCli.git
cd taskTrackerCLI
npm install
`

# Usage


- To list all tasks: `node script.js view all`
- To get tasks by staus: `node script js view <status>`. Use `'In Progress'`, `'To do'`, `'Complete'`
- To add a task: `node script.js add <description>`
- To edit task status: `node script.js change-status <taskId> ,new status>`. Use the following: `'In Progress'`, `'To do'`, `'Complete'`
- To edit a task: `node script.js update <taskId> <newDescription>`
- To delete a task: `node delete <taskId>`
