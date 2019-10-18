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
	
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses;
	}

	addRow(task) {
		let id = task.id
		let row = this.table.insertRow(0);

		row.insertCell(0).innerHTML = this.table.rows.length;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;

		row.className += "radene"
		row.setAttribute("id", task.id);
		 let selectList = document.createElement("select");
		   selectList.setAttribute("id", task.id);
		   selectList.setAttribute("class", "statusChanger");

		   
		   let option = document.createElement("option");
		     option.setAttribute("value", "");
		     option.text = "<Modify>"
		     option.setAttribute("selected", "selected")
		     option.setAttribute("disabled", "disabled")
		     selectList.appendChild(option);

		   for (let j = 0; j < this._allstatuses.length; j++) {
		     let option = document.createElement("option");
		     option.setAttribute("value", j);
		     option.text = this._allstatuses[j];
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
		   selectList.addEventListener("change", this.modifyStatus.bind(this), false)
	}
	

	modifyStatus(task){
		let id = task.target.id
		let status = this._allstatuses[task.target.value]
		
		let  r = window.confirm("Set status of task with id " + id + " to " + status)
		if (r){
			this.newStatusCallbacks.forEach((x) => x(id, status))
		}else{
			console.log("Cancelled by user.")
		}
		
		
	}
	
	updateTask(id,status){
		let rows = document.getElementsByClassName('radene');
		for (let i = 0; i<rows.length; i++){
			if (rows[i].id == id){
				rows.childNodes[2].innerText = status
			}
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
		gui.allstatuses = json.allstatuses
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
//setupStatus()

    
