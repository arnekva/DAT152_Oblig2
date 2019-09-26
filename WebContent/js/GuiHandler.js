"use strict";

class GuiHandler {

	constructor() {
		this.table = document.getElementById('task_table');
	}

	addRow(i, task) {
		let row = this.table.insertRow(-1);

		row.insertCell(0).innerHTML = task.id;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;

		row.className += "radene"
		 var selectList = document.createElement("select");
		   selectList.setAttribute("id", i);
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
		   row.insertCell(4).innerHTML = '<button id="deleteBtn-' + task.id + '">Delete</button>';

		   document.getElementById("deleteBtn-" + task.id).addEventListener("click", (e) => {
			   var txt;
			   var  r = window.confirm("Do you want to delete this task?")
			   if (r==true){
				   console.log("Task Deleted")
				   this.deleteRow(row.rowIndex);
			   }else{
				   console.log("Deletion canceled")
			   }
			}, true);
		   updateStatusChanger()

	}
	

	editRow(x, me){
		console.log("index: " + me.id)
		console.log(me.value)
		   var  r = window.confirm("Set " + x[me.id].cells[1].innerHTML + " to " + this.statuses[me.value])
		   if (r==true){
			   console.log("Status changed")
			   x[me.id].cells[2].innerHTML = this.statuses[me.value]
		   }else{
			   console.log("Cancelled by user. If not then something went really fu**ing wrong.")
		   }
		
	}

	deleteRow(i) {
		this.table.deleteRow(i);
		let tab = document.getElementsByClassName('statusChanger')
		console.log(tab)
		for(let i=0; i<tab.length;i++){
			tab[i].id = i;
		}
	}

}


const gui = new GuiHandler()

window.onload = function()
{setupStatus()

	let test = document.getElementsByClassName('statusChanger')
	let radene = document.getElementsByClassName('radene')
	var x = document.getElementById("task_table").rows;
	console.log(radene.length)
	console.log(test.length)
	for (var i = 0; i < test.length; i++) {
		console.log(test[i])
		console.log(radene[i])
	    test[i].onchange = function () {


						gui.editRow(x, this)


	       //editRow(this.value);
	    }
		
	}

	document.getElementById('message').innerHTML = "Found " + x.length + " tasks."
	console.log("tasks found")
};
//document.getElementById("newtaskbtn").onclick = function()
//{addNewTask()};

function updateStatusChanger(){
	let test = document.getElementsByClassName('statusChanger')
	for (var i = 0; i < test.length; i++) {
	    test[i].onchange = function () {
			gui.editRow(x, this)
	    }
		
	}
}


function addNewTask(newtask){
	gui.addRow(newtask);
}
function updateTask(oldtask, newtask){
	gui.editrow(oldtask, newtask);
}

function setupStatus() {

	console.log("step3");

	const statuses = ["WAITING","ACTIVE","DONE"]
	const tasks = [
	    {id:1,title:"Paint roof",status:"WAITING"},
	    {id:2,title:"Clean floor",status:"DONE"},
	    {id:3,title:"Wash windows",status:"ACTIVE"}
	]
	gui.statuses = statuses
 for(let i =0; i<tasks.length;i++){
	 gui.addRow(i, tasks[i]);
 }

}