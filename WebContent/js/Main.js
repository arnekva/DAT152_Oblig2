"use-strict"

const statuses = ["WAITING", "ACTIVE", "DONE"];
const tasks = [
	{ id: 1, title: "Paint roof", status: "WAITING" },
    { id: 2, title: "Clean floor", status: "DONE" },
    { id: 3, title: "Wash windows", status: "ACTIVE" }
  ];
const gui = new GuiHandler();

for(let i =1; i<=tasks.length;i++){
	 gui.addRow(i, tasks[i-1]);
}



