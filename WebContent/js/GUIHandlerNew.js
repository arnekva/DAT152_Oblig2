"use strict";

class GUIHandler {
  constructor() {
    // Instantiate a class representing our modal
  this.modal = new Modal();

    // Create a table
    this.taskList = document.getElementById("task_table");

    // Append headers
    this.appendTableHeader();

    // Append body
    this.taskList.createTBody();

    // Append "Add task"-button
    this.appendAddButton();

    // Initially (or on reload), fetch all tasks from DB and insert in table
    this.fetchAlltasks();

    // Set the "deletetask"-callback function
    this.deleteTaskCallback = (taskId) => {
      var conf = confirm("Are you sure that you want to delete task: " + taskId + "?");
      if(conf) {
        let url = config.servicesPath + "/task";
        const ajax = new AJAXConnection(url);
        ajax.del([taskId]);

        ajax.onsuccess = (element) => {
          console.log(element);
          var child = document.getElementById(taskId);
          child.parentElement.removeChild(child);
        }
      }
    }

    // Set the "edittask"-callback function
    this.edittaskCallBack = (taskId, data) => {
      let url = config.servicesPath + "/task";
      const ajax = new AJAXConnection(url);
      ajax.put([taskId], data);

      ajax.onsuccess = (element) => {
        console.log(element);
        this.updatetask(taskId, data);
      }
    }

    // Set the "addtask"-callback function
    this.addtaskCallback = (data) => {
      let url = config.servicesPath + "/task";
      const ajax = new AJAXConnection(url);

      ajax.onsuccess = (element) => {
        const id = JSON.parse(element).taskId;
        const task = data;
        task.taskId = id;
        this.inserttask(task);
      }

      ajax.post(null,data);
    }

    // Set the the "click"-event handler on the "Update task"-button in the
    // "Edit task"-modal view
    document.getElementById("modal-update-button").addEventListener("click", () => {
      var updatedData = {};
      updatedData.firstname = document.getElementById("firstname").value;
      updatedData.lastname = document.getElementById("lastname").value;
      updatedData.address = document.getElementById("address").value;
      updatedData.phone = document.getElementById("phone").value;
      this.edittaskCallBack(this.modal.currenttaskId, updatedData);
    });

    // Set the the "click"-event handler on the "Add task"-button in the
    // "Add task"-modal view
    document.getElementById("modal-add-button").addEventListener("click", () => {
      var taskData = {};
      taskData.firstname = document.getElementById("firstname").value;
      taskData.lastname = document.getElementById("lastname").value;
      taskData.address = document.getElementById("address").value;
      taskData.phone = document.getElementById("phone").value;
      this.addtaskCallback(taskData);
    });
  }


  /**
   * Retreives all tasks from the "local" DB.
   */
  fetchAlltasks() {
    let url = config.servicesPath + "/updates";
    const ajax = new AJAXConnection(url);
    ajax.get([-1]);

    // Callbacks
    ajax.onsuccess = (element) => {
      var json = JSON.parse(element);
      if(json.status) {
        var tasks = json.newtasks;
        for(var it = 0; it < tasks.length; it++) {
          this.inserttask(tasks[it]);
        }
      }
    }

    ajax.onerror = () => {
      console.log("ERROR! Something went wrong. One or more object(s) could not be retreived from the DB.");
    }
  }

  /**
   * Insert a task into the task-list table.
   *
   * @param {object} task An object with the "task"-data
   */
  inserttask(task) {
    // Extract the data from the 'task'-object
    var taskData = task;
    var row = document.createElement("tr");
    row.id = taskData.taskId;
    var fname = document.createElement("td");
    fname.textContent = taskData.firstname;
    var lname = document.createElement("td");
    lname.textContent = taskData.lastname;
    var addr = document.createElement("td");
    addr.textContent = taskData.address;
    var phn = document.createElement("td");
    phn.textContent = taskData.phone;

    row.appendChild(fname);
    row.appendChild(lname);
    row.appendChild(addr);
    row.appendChild(phn);
    this.appendDeleteAndEditButtons(row);

    // Insert the newly created row into our table
    this.taskList.tBodies[0].appendChild(row);
  }

  /**
   * Update a task (a row in our task-list table).
   *
   * @param {number} taskId Id of the task we want to update
   * @param {object} newData An object containing one or several fields we want to update
   */
  updatetask(taskId, newData) {
    var task = document.getElementById(taskId);
    // Update firstname
    if(newData.firstname) task.cells[0].textContent = newData.firstname;
    // Update lastname
    if(newData.lastname) task.cells[1].textContent = newData.lastname;
    // Update address
    if(newData.address) task.cells[2].textContent = newData.address;
    // Update phone
    if(newData.phone) task.cells[3].textContent = newData.phone;
  }

  /**
   * Append a cell containing a "Delete"-button and a cell containing a "Edit"-button
   * to a given row in our task-list table.
   *
   * @param {number} row Id representing the row
   */
  appendDeleteAndEditButtons(row) {
    var deleteCell = document.createElement("td");
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteCell.appendChild(deleteBtn);

    var editCell = document.createElement("td");
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editCell.appendChild(editBtn);

    row.appendChild(deleteCell);
    row.appendChild(editCell);

    deleteBtn.addEventListener("click", () => {
      this.deletetaskCallback(row.id)
    });

    editBtn.addEventListener("click", () => {
      this.modal.currenttaskId = row.id;
      this.modal.toggleModalDisplay();
      this.modal.toggleButtonDisplay("modal-update-button");
      var data = {};
      data.firstname = row.cells[0].textContent;
      data.lastname = row.cells[1].textContent;
      data.address = row.cells[2].textContent;
      data.phone = row.cells[3].textContent;
      this.modal.fillInputFields(data);
    });
  }

  /**
   * Append a header to our task-list table.
   */
  appendTableHeader() {
    // Table header texts
    var headerData = ["Id", "Title", "Status"];

    // Create a table header
    var header = this.taskList.createTHead();

    // Populate the table header with header texts
    headerData.forEach(function (headerText) {
      var cell = document.createElement("th");
      cell.textContent = headerText;
      cell.style.borderBottom = "1px solid #ddd";
      header.appendChild(cell);
    });
    header.appendChild(document.createElement("th"));
    header.appendChild(document.createElement("th"));
  }

  /**
   * Append a "Add task"-button at the bottom of our HTML-body.
   */
  appendAddButton() {
    // Add an "add"-button
    var addtaskBtn = document.createElement("button");
    addtaskBtn.textContent = "Add task";

    addtaskBtn.addEventListener("click", () => {
      this.modal.toggleModalDisplay();
      this.modal.toggleButtonDisplay("modal-add-button");
    });

    document.body.appendChild(addtaskBtn);
  }
}
