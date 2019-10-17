"use strict";

class GuiHandler {

	constructor() {
		this.table = document.getElementById('task_table')
	}
	
	set deleteTaskCallback(id){
		console.log("User has approved the deletion of task with id" + id)
		this.deleteTask(id)
	}
	
	set newStatusCallback(task){
		var  r = window.confirm("Set status of task with id " + task.id + " to " + this.statuses[task.value])
		if (r==true){
			task.status = this.statuses[task.value]
			console.log("User has approved to change the status of task with id " + task.id + " to " + task.status)
			this.modifyStatus(task)
		}else{
			console.log("Cancelled by user.")
		}
	}
	
	set newTaskCallback(task){
		console.log("User has requested to add a new task titled: " + task.title + ", with status: " + task.status)
		this.addNewTask(task)
	}

	addRow(task) {
		let row = this.table.insertRow(-1);

		row.insertCell(0).innerHTML = this.table.rows.length;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;

		row.className += "radene"
		 var selectList = document.createElement("select");
		   selectList.setAttribute("id", task.id);
		   selectList.setAttribute("class", "statusChanger");
		   
		   var option = document.createElement("option");
		     option.setAttribute("value", "");
		     option.text = "<Modify>"
		     option.setAttribute("selected", "selected")
		     option.setAttribute("disabled", "disabled")

		     selectList.appendChild(option);
		   for (var j = 0; j < this.statuses.length; j++) {
		     var option = document.createElement("option");
		     option.setAttribute("value", j);
		     option.text = this.statuses[j];
		     
		     selectList.appendChild(option);
		   }
		   var cell = row.insertCell(3);
		   cell.appendChild(selectList);
		   row.insertCell(4).innerHTML = '<button id="deleteBtn-' + task.id + '" class="delbtn">Delete</button>';

		   document.getElementById("deleteBtn-" + task.id).addEventListener("click", (e) => {
			   var txt;
			   var  r = window.confirm("Do you want to delete this task?")
			   if (r==true){
				   this.deleteTaskCallback = task.id
			   }else{
				   console.log("Deletion canceled.")
			   }
			}, true);
		   updateStatusChanger()
	}
	

	modifyStatus(task){
		ajax.modifyStatus(task)
		.then(json => {
			if (json.responseStatus == 1){
				console.log("Status was updated.")
				location.reload(false)
			} else {
				console.log("Status was not updated.")
			}
		})
	}

	deleteTask(i) {
		ajax.deleteTask(i)
		.then(json => {
			if (json.responseStatus == 1){
				console.log("The task has been deleted.")
				location.reload(false)
			} else {
				console.log("The task was not deleted.")
			}
		})
	}
	
	addNewTask(newtask){
		ajax.addNewTask(newtask)
		.then(json => {
			if (json.responseStatus == 1){
				console.log("The task has been added.")
				location.reload(false)
			} else {
				console.log("The task was not added.")
			}	
		})
	}
}

const ajax = new ajaxHandler()
const gui = new GuiHandler()


function updateStatusChanger(){
	let test = document.getElementsByClassName('statusChanger')
	for (var i = 0; i < test.length; i++) {
	    test[i].onchange = function () {
			gui.newStatusCallback = this
	    }	
	}
}


function setupStatus() {

console.log("Loading page...")
	
	ajax.allstatuses()
	.then(json => {
		gui.statuses = json.allstatuses
		const modal = new ModalBox()

		ajax.getAllTasks()
		.then(json => {
			var allTasks = json.tasks
			document.getElementById('message').innerHTML = "Found " + allTasks.length + " tasks."
			for (var i = 0; i < allTasks.length; i++){
				gui.addRow(allTasks[i])
			}
		})

		let test = document.getElementsByClassName('statusChanger')
		for (var i = 0; i < test.length; i++) {
		    test[i].onchange = function () {
				gui.newStatusCallback = this
			}
		}
	})
}
setupStatus()

    
