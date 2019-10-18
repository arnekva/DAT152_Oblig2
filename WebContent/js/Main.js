"use-strict"

const statuses = ["WAITING", "ACTIVE", "DONE"];
const tasks = [
	{ id: 1, title: "Paint roof", status: "WAITING" },
    { id: 2, title: "Clean floor", status: "DONE" },
    { id: 3, title: "Wash windows", status: "ACTIVE" }
  ];


for(let i =1; i<=tasks.length;i++){
	 gui.addRow(tasks[i-1]);
}


gui.deleteTaskCallback = (id) => {
    console.log(`User has approved the deletion of task with id ${id}.`)
    gui.deleteTask(id)
} 