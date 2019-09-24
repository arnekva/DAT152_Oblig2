"use strict";

class GuiHandler {
	
	showTask(task){
		
		if (document.getElementById("taskTab") == null){
			var taskDiv = document.getElementById("tasks");
			console.log("step1");
			var tabell = document.createElement("table");
			tabell.setAttribute("id", "taskTab");
			var thead = document.createElement("thead");
			tabell.appendChild(thead);
				var headRow = document.createElement("tr");
				thead.appendChild(headRow);
				var th1 = document.createElement("th");
				var thTxt1 = document.createTextNode("Task");
				th1.appendChild(thTxt1);
				headRow.appendChild(th1);
				var th2 = document.createElement("th");
				var thTxt2 = document.createTextNode("Status");
				th2.appendChild(thTxt2);
				headRow.appendChild(th2);
			var tbody = document.createElement("tbody");
			tbody.setAttribute("id", "tableBody");
			tabell.appendChild(tbody);
		}
		console.log("step2");
		var tbody2 = document.getElementById("tableBody");
			var tRow = document.createElement("tr");
			tRow.setAttribute("id", task.id);
			tbody2.appendChild(tRow);
				var td1 = document.createElement("td");
				var tdTxt1 = document.createTextNode(task.title);
				td1.appendChild(tdTxt1);
				tRow.appendChild(td1);
				var td2 = document.createElement("td");
				var tdTxt2 = document.createTextNode(task.status);
				td2.appendChild(tdTxt2);
				tRow.appendChild(td2);
				
	}
	
	
}



function skalKallesIBegynelsen() {
	console.log("step3");
	const gui = new GuiHandler()
	const statuses = ["WAITING","ACTIVE","DONE"]
	const tasks = [
	    {"id":1,"title":"Paint roof","status":"WAITING"},
	    {"id":2,"title":"Clean floor","status":"DONE"},
	    {"id":3,"title":"Wash windows","status":"ACTIVE"}
	]

	gui.allstatuses = statuses;
	tasks.forEach((task) => {gui.showTask(task)})
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
