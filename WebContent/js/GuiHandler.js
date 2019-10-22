"use strict";

class GuiHandler {

	constructor() {
		this.allstatuses = []
		this.deletetaskCallbacks = new Array() 
		this.newStatusCallbacks = new Array()
	}
	
	/**
	 * Adds a method to the list of callbacks to be called upon deletion of a task
	 * @param javascript method
	 */
	set deleteTaskCallback(method){
		this.deletetaskCallbacks.push(method)
	}
	
	/**
	 * Adds a method to the list of callbacks to be called upon changing the status of a task
	 * @param javascript method
	 */
	set newStatusCallback(method){
		this.newStatusCallbacks.push(method)
	}
	
	/**
	 * Sets the class attribute allstatuses to the given parameter
	 * @param list of statuses
	 */
	set allstatuses(allstatuses){
		this._allstatuses = allstatuses
	}
	
	/**
	 * Adds a new task to the list
	 * @param task with attributes id, title, status
	 */
	addRow(task) {
		let id = task.id
		let table = document.getElementById('task_table')
		let row = table.insertRow(0)

		row.insertCell(0).innerText = table.rows.length
		row.insertCell(1).innerText = task.title
		row.insertCell(2).innerText = task.status

		row.className += "radene"
		row.setAttribute("id", task.id)
		 let selectList = document.createElement("select")
		   selectList.setAttribute("id", task.id)
		   selectList.setAttribute("class", "statusChanger")

		   
		   let option = document.createElement("option")
		     option.setAttribute("value", "")
		     option.text = "<Modify>"
		     option.setAttribute("selected", "selected")
		     option.setAttribute("disabled", "disabled")
		     selectList.appendChild(option)

		   for (let j = 0; j < this._allstatuses.length; j++) {
		     let option = document.createElement("option")
		     option.setAttribute("value", j)
		     option.text = this._allstatuses[j]
		     selectList.appendChild(option)
		   }
		   
		   let cell = row.insertCell(3)
		   cell.appendChild(selectList)
		   row.insertCell(4).innerHTML = '<button id="deleteBtn-' + task.id + '" class="delbtn" data-taskid=' + task.id + '>Delete</button>'

		   document.getElementById("deleteBtn-" + task.id).addEventListener("click", this.deleteTask.bind(this), true)
		   selectList.addEventListener("change", this.modifyStatus.bind(this), false)
		   this.noTask()
	}
	
	/**
	 * Calls all methods in newStatusCallbacks with id and status as parameter if user confirms prompt
	 * @param selectList object with id of task and index of status as attributes
	 */
	modifyStatus(task){
		let id = task.target.id
		let status = this._allstatuses[task.target.value]
		
		let  r = window.confirm("Set status of task to " + status + "?")
		if (r){
			this.newStatusCallbacks.forEach((x) => x(id, status))
		}else{
			console.log("Cancelled by user.")
		}
		
		
	}
	
	/**
	 * Updates the html of task with given id to new status
	 * @param id of task, new status for task
	 */
	updateTask(id,status){
		let rows = document.getElementsByClassName('radene')
		for (let i = 0; i<rows.length; i++){
			if (rows[i].id == id){
				rows[i].childNodes[2].innerText = status
			}
		}
	}
	
	/**
	 * Calls all methods in deletetaskCallbacks with id of task as parameter if user confirms prompt
	 * @param object with attribute taskid
	 */
	deleteTask(object) {
		let id = object.target.dataset.taskid
		let  r = window.confirm("Do you want to delete this task?")
		if (r){
		   this.deletetaskCallbacks.forEach((x) => x(id))
	    }else{
		   console.log("Deletion canceled.")
	    }
	}
	
	/**
	 * Removes the task with given id from the html-view
	 * @param id of task to be removed
	 */
	removeTask(id){
		let index = 0
		let rows = document.getElementsByClassName('radene')
		for (let i = 0; i<rows.length; i++){
			if (rows[i].id == id){
				index = i
			}
		}
		document.getElementById('task_table').deleteRow(index)
		for (let j = 0; j<rows.length; j++){
			rows[j].cells[0].innerText = rows.length - j
		}
		this.noTask()
	}
	
	/**
	 * Displays number of tasks in the view
	 */
	noTask(){
		let rows = document.getElementsByClassName('radene')
		let number = rows.length
		if (number === 0){
			document.getElementById('message').innerText = "Waiting for server data."
		} else {
			document.getElementById('message').innerText = "Found " + number + " tasks."
		}
	}
	
}

    
