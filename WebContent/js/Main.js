"use-strict"

const statuses = ["WAITING", "ACTIVE", "DONE"];
const tasks = [
	{ id: 1, title: "Paint roof", status: "WAITING" },
    { id: 2, title: "Clean floor", status: "DONE" },
    { id: 3, title: "Wash windows", status: "ACTIVE" }
  ];
gui.allstatuses = statuses;

for(let i =1; i<=tasks.length;i++){
	 gui.addRow(tasks[i-1]);
}
function testavtilgang(x){
	console.log("printer den dette også mon tro?" + x)
}


gui.deleteTaskCallback = (id) => {
    console.log(`User has approved the deletion of task with id ${id}.`)
    testavtilgang(id)
} 

gui.newStatusCallback = (id,newStatus) => {
    console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`)
    gui.updateTask(id,newStatus)
}