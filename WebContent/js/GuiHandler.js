"use strict";

class GuiHandler {

	constructor() {
		this.table = document.getElementById('task_table')
		this.allstatuses = []
		this.deletetaskCallbacks = new Array() 
		this.newStatusCallbacks = new Array()
	}
	
	
	set deleteTaskCallback(method){
		this.deletetaskCallbacks.push(method)
	}
	
	set newStatusCallback(method){
		this.newStatusCallbacks.push(method)
	}
	
	set allstatuses(statuses){
		this.statuses = statuses;
	}

	addRow(task) {
		let id = task.id
		let row = this.table.insertRow(0);

		row.insertCell(0).innerHTML = this.table.rows.length;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;

		row.className += "radene"
		 let selectList = document.createElement("select");
		   selectList.setAttribute("id", task.id);
		   selectList.setAttribute("class", "statusChanger");
		   selectList.addEventListener("change", function() {newStatusCallback = selectList}, false)
		   
		   
		   
		   let option = document.createElement("option");
		     option.setAttribute("value", "");
		     option.text = "<Modify>"
		     option.setAttribute("selected", "selected")
		     option.setAttribute("disabled", "disabled")

		     selectList.appendChild(option);
		   for (let j = 0; j < this.statuses.length; j++) {
		     let option = document.createElement("option");
		     option.setAttribute("value", j);
		     option.text = this.statuses[j];
		     
		     selectList.appendChild(option);
		   }
		   let cell = row.insertCell(3);
		   cell.appendChild(selectList);
		   row.insertCell(4).innerHTML = '<button id="deleteBtn-' + task.id + '" class="delbtn">Delete</button>';

		   document.getElementById("deleteBtn-" + task.id).addEventListener("click", (e) => {
			   let txt;
			   let  r = window.confirm("Do you want to delete this task?")
			   if (r==true){
				   this.deleteTaskCallback = task.id
			   }else{
				   console.log("Deletion canceled.")
			   }
			}, true);
		   
//		   updateStatusChanger()
	}
	

	modifyStatus(task, callback){
		let  r = window.confirm("Set status of task with id " + task.id + " to " + this.statuses[task.value])
		if (r==true){
			task.status = this.statuses[task.value]
			console.log("User has approved to change the status of task with id " + task.id + " to " + task.status)
			ajax.modifyStatus(task)
			.then(json => {
				if (json.responseStatus == 1){
					console.log("Status was updated.")
					location.reload(false)
				} else {
					console.log("Status was not updated.")
				}
			})	
		}else{
			console.log("Cancelled by user.")
		}
		
		
	}

	deleteTask(i) {
		for(let i = 1; i<4; i++){
			this.deletetaskCallbacks.forEach((x) => x(i))
		}
		
//		ajax.deleteTask(i)
//		.then(json => {
//			if (json.responseStatus == 1){
//				console.log("The task has been deleted.")
//				location.reload(false)
//			} else {
//				console.log("The task was not deleted.")
//			}
//		})
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
		const modal = new ModalBox(gui.statuses)

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

    
