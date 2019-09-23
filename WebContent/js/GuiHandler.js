class GuiHandler {
	
	showTask(task){
		this.allstatuses.forEach(status => console.log(status));
		console.log(task.id);
		
		//er vi inne på noe her....?? 
		var leggTil = document.createDocumentFragment();
		var task = document.createElement('td');
		task.id = 'task.id';
		task.className += 'task';
		leggTil.appendChild(task);
		document.getElementById('appendTable').appendChild(leggTil);
	}
	
	
}

"use strict";

const gui = new GuiHandler()
const statuses = ["WAITING","ACTIVE","DONE"]
const tasks = [
    {"id":1,"title":"Paint roof","status":"WAITING"},
    {"id":2,"title":"Clean floor","status":"DONE"},
    {"id":3,"title":"Wash windows","status":"ACTIVE"}
]

gui.allstatuses = statuses
tasks.forEach((task) => {gui.showTask(task)})