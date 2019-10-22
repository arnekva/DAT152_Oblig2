"use strict";

class GuiHandler {

	constructor() {
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
		this._allstatuses = allstatuses
	}
	
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
	
	updateTask(id,status){
		let rows = document.getElementsByClassName('radene')
		for (let i = 0; i<rows.length; i++){
			if (rows[i].id == id){
				rows[i].childNodes[2].innerText = status
			}
		}
	}

	deleteTask(object) {
		let id = object.target.dataset.taskid
		let  r = window.confirm("Do you want to delete this task?")
		if (r){
		   this.deletetaskCallbacks.forEach((x) => x(id))
	    }else{
		   console.log("Deletion canceled.")
	    }
	}
	
	removeTask(id){
		let index = 0
		let rows = document.getElementsByClassName('radene')
		console.log(rows)
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

    
