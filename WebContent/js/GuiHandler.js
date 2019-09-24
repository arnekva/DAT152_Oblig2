"use strict";

class GuiHandler {
	
	constructor() {
		this.table = document.getElementById('maintable');
	}

	addRow(i, task, tasks, statuses) {
		let row = this.table.insertRow(-1);

		row.insertCell(0).innerHTML = task.id;
		row.insertCell(1).innerHTML = task.title;
		row.insertCell(2).innerHTML = task.status;
		
		 var selectList = document.createElement("select");
		   selectList.setAttribute("id", "mySelect"+i);
		   selectList.setAttribute("class", "statusChanger");

		   for (var j = 0; j < statuses.length; j++) {
		     var option = document.createElement("option");
		     option.setAttribute("value", task.id);
		     option.text = statuses[j];
		     
		     selectList.appendChild(option);
		   }
		   var cell = row.insertCell(3);
		   cell.appendChild(selectList);
	     
		
	}

	editRow(old, newtask){
		let row = old.parenNode.parenNode.rowIndex;
		row.insertCell(0).innerHTML = newtask.id;
		row.insertCell(1).innerHTML = newtask.title;
		row.insertCell(2).innerHTML = newtask.status;
	}

	deleteRow(i) {
		this.table.deleteRow(i);
	}
	
}


const gui = new GuiHandler()

window.onload = function()
{setupStatus()
	let test = document.getElementsByClassName('statusChanger')
	console.log(test.length)
	for (var i = 0; i < test.length; i++) {
	    test[i].onchange = function () {
	        
	    }
	}


};
document.getElementById("newtaskbtn").onclick = function()
{addNewTask()};



function addNewTask(newtask){
	gui.addRow(newtask);
}
function updateTask(oldtask, newtask){
	gui.editrow(oldtask, newtask);
}

function setupStatus() {
	
	console.log("step3");
	
	const statuses = ["WAITING","ACTIVE","DONE","TEST"]
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
