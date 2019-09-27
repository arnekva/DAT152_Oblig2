"use strict";

class GuiHandler {

	constructor() {
		this.table = document.getElementById('task_table');
	}
	
	set deleteTaskCallback(id){
		id();
	}
	
	set newStatusCallback(task){
		console.log("User has approved to change the status of task with id " + task.id + " to " + task.status);
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
		     
		     //ALT AVHENGIG HER AV FØRSTE GET IKKE BLIR FOR TREIG
		     //

		     selectList.appendChild(option);
		   }
		   var cell = row.insertCell(3);
		   cell.appendChild(selectList);
		   row.insertCell(4).innerHTML = '<button id="deleteBtn-' + task.id + '" class="delbtn">Delete</button>';

		   document.getElementById("deleteBtn-" + task.id).addEventListener("click", (e) => {
			   var txt;
			   var  r = window.confirm("Do you want to delete this task?")
			   if (r==true){
				   this.deleteTaskCallback = (id) => {console.log(`User has approved the deletion of task with id ${task.id}.`)}
				   this.deleteTaskCallback = (id) => {console.log(`Observer, task with id ${task.id} is not removed from the view!`)}
				   //console.log("Task Deleted")
				   //this.deleteRow(row.rowIndex);
			   }else{
				   console.log("Deletion canceled")
			   }
			}, true);
		   updateStatusChanger()
		   console.log(this.statuses)
	}
	

	editRow(allTasks, thisTask){
		let math = thisTask.id-1
		console.log("index: " + math)
		console.log(thisTask.id)
		console.log(thisTask.value)
		   var  r = window.confirm("Set " + allTasks[thisTask.id-1].cells[1].innerHTML + " to " + this.statuses[thisTask.value])
		   if (r==true){
			   thisTask.status = this.statuses[thisTask.value]
			   this.newStatusCallback = thisTask
			   console.log("Status changed")
			   allTasks[thisTask.id-1].cells[2].innerHTML = this.statuses[thisTask.value]
			   console.log(this.statuses)
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
		updateId()
	}

}

const ajax = new ajaxHandler()
const gui = new GuiHandler()

window.onload = function()
{setupStatus()

	let test = document.getElementsByClassName('statusChanger')
	let radene = document.getElementsByClassName('radene')
	var allTasks = document.getElementById("task_table").rows;
	console.log(radene.length)
	console.log(test.length)
	for (var i = 0; i < test.length; i++) {
		console.log(test[i])
		console.log(allTasks[i])
		console.log(radene[i])
	    test[i].onchange = function () {


						gui.editRow(allTasks, this)


	       //editRow(this.value);
	    }
		
	}

	document.getElementById('message').innerHTML = "Found " + allTasks.length + " tasks."
	console.log("tasks found")
};
//document.getElementById("newtaskbtn").onclick = function()
//{addNewTask()};

function updateStatusChanger(){
	let test = document.getElementsByClassName('statusChanger')
	var x = document.getElementById("task_table").rows;
	for (var i = 0; i < test.length; i++) {
	    test[i].onchange = function () {
			gui.editRow(x, this)
	    }
		
	}
}
function updateId(){
	let alltasks = document.getElementsByClassName('radene')
	let allDelbtn = document.getElementsByClassName('delbtn')
	for(let i = 0; i<alltasks.length; i++){
		console.log(alltasks[i])
		alltasks[i].cells[0].innerHTML = i+1
		let math = i+1
		allDelbtn[i].id = 'deleteBtn-' + math;
	}
}

function addNewTask(newtask){
	gui.addRow(newtask);
}
function updateTask(oldtask, newtask){
	gui.editrow(oldtask, newtask);
}

function setupStatus() {

	console.log("step3")
	const statuseslist = ["WAITING","ACTIVE","DO323133NE"]
	gui.statuses = statuseslist
	const tasks = [
	    {id:1,title:"Paint roof",status:"WAITING"},
	    {id:2,title:"Clean floor",status:"DONE"},
	    {id:3,title:"Wash windows",status:"ACTIVE"}
	]
 for(let i =1; i<=tasks.length;i++){
	 gui.addRow(i, tasks[i-1]);
 }

//	console.log("før await")
//	const statusesJson = await result.json()
//	console.log(`Test print: '${JSON.stringify(statusesJson)}'`)

	
//	const statusesJson = ajax.statusesResponse
//		console.log("test of status gettin")
//		console.log(statusesJson)

	//console.log(getstatuses)
	setupCallback(function() {
	    console.log('Pass2');
	    
	});
	
	console.log("hei1")


}

function setupCallback(callback){
	const statuses = ajax.allstatuses()
	
    console.log('Pass1');
    console.log(statuses)
    gui.statuses = statuses
    callback();
}