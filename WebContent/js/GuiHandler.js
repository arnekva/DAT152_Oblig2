"use strict";

class GuiHandler {

	constructor() {
		this.table = document.getElementById('task_table');
		this.modal = new ModalBox()
	}

	addRow(i, task, tasks, statuses) {
		let row = this.table.insertRow(-1);

		row.insertCell(0).innerHTML = task.id;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;

		row.className += "radene"
		 var selectList = document.createElement("select");
		   selectList.setAttribute("id", i);
		   selectList.setAttribute("class", "statusChanger");

		   for (var j = 0; j < statuses.length; j++) {
		     var option = document.createElement("option");
		     option.setAttribute("value", j);
		     option.text = statuses[j];

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

	}

	editRow(x, me){
		console.log("index: " + me.id)
		console.log(me.value)
		   var  r = window.confirm("Set " + x[me.id].cells[1].innerHTML + " to " + statuses[me.value])
		   if (r==true){
			   console.log("Status changed")
			   x[me.id].cells[2].innerHTML = statuses[me.value]
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



function addNewTask(newtask){
	gui.addRow(newtask);
}
function updateTask(oldtask, newtask){
	gui.editrow(oldtask, newtask);
}

const statuses = ["WAITING","ACTIVE","DONE"]
function setupStatus() {

	console.log("step3");


	const tasks = [
	    {id:1,title:"Paint roof",status:"WAITING"},
	    {id:2,title:"Clean floor",status:"DONE"},
	    {id:3,title:"Wash windows",status:"ACTIVE"}
	]
 for(let i =0; i<tasks.length;i++){
	 gui.addRow(i, tasks[i], tasks, statuses);
 }

}


function testAvHtmlInsert() {

	var endreDiv = document.getElementById("tasks");
	var nyNode = document.createElement("p");
	nyNode.setAttribute("id", "idTest");
	var txt = document.createTextNode("Tester insertion av html-noder");
	nyNode.appendChild(txt);
	endreDiv.appendChild(nyNode);
	var idHenteTest = document.getElementById("idTest");
	var nyNode2 = document.createElement("p");
	var txt2 = document.createTextNode("Tester id på ny noder");
	nyNode2.appendChild(txt2);
	idHenteTest.appendChild(nyNode2);

}

function gjemmerMidlertidigVekk() {
	this.allstatuses.forEach(status => console.log(status));
	console.log(task.id);



	var td3 = document.createElement("td");
	var select = document.createElement("select");
	td3.appendChild(select);
		var option = document.createElement("option");
		option.setAttribute("value", "0");
		option.setAttribute("selected", " ");
		var oTxt1 = document.createTextNode("&lt;");
td2.appendChild(tdTxt2);
tRow.appendChild(td2);
}
