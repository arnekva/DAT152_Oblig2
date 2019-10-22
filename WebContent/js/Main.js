"use-strict"

const ajax = new ajaxHandler()
const gui = new GuiHandler()
const modal = document.getElementById("myModal")

 /**
 * Initial setup of tasklist on loading of page.
 * Gets statuses and tasks from database using ajaxhandler.
 */
async function setup(){
	const statusesJson = await ajax.allstatuses()
	const statuses = statusesJson.allstatuses
	const tasksJson = await ajax.getAllTasks()
	const tasks = tasksJson.tasks
	
	gui.allstatuses = statuses;

	for(let i =1; i<=tasks.length;i++){
		 gui.addRow(tasks[i-1]);
	}

	gui.deleteTaskCallback = (id) => {
	    console.log(`User has approved the deletion of task with id ${id}.`)
	    ajax.deleteTask(id, gui.removeTask.bind(gui))
	} 

	gui.newStatusCallback = (id,newStatus) => {
	    console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`)
	    ajax.modifyStatus(id,newStatus, gui.updateTask)
	}

	modalbox = new ModalBox(modal);

	modalbox.allstatuses = statuses;

	modalbox.onsubmitCallback = (task) => {
		console.log(`New task ${task.title} with initial status ${task.status} is added by the user`)
		ajax.addNewTask(task, gui.addRow.bind(gui))
	}

}
setup()
