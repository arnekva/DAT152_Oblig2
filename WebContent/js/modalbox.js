class ModalBox{
	
	/**
	 * @param {List} allstatuses
	 * @param {Function} onsubmit
	 * 			
	 */
	constructor(){
		
		this.onsubmitCallbacks = new Array()
		this.allstatuses =[]
		
		const btn = document.getElementById("addTask")
		const span = document.getElementsByClassName("close")[0]
		const showmodalbtn = document.getElementById("newtaskbtn")
		
		showmodalbtn.addEventListener("click", () => this.show(), true)
		btn.addEventListener("click", () => this.submit(), true)
		span.addEventListener("click", () => this.close(), true)
	}
	/**
	 * Sets the callback to be called on submit
	 */
	set onsubmitCallback(method){
		this.onsubmitCallbacks.push(method)
	}
	/**
	 * All statuses setter
	 */
	set allstatuses(statuses){
		this._allstatuses = statuses
	}
	 /**
	 * Function displaying the modal box
	 */
	show(){
		
		let modal = document.getElementById("myModal")
		let selectstatus = document.getElementById("modalstatuslist")
		if(selectstatus.length < 1) {
			console.log("Appending child elements for dropdown")
			for (let i = 0; i<this._allstatuses.length; i++){
				let op = document.createElement("option");
				op.innerText = this._allstatuses[i];
				selectstatus.appendChild(op);
			}
		}else{
			console.log("Select list child elements have already been created")
		}
		modal.style.display = "block";
	}
	 /**
	 * Function that fetches data from input fields and creates a JSON structure Task object for the submit
	 */
	submit(){
		let titletxt = document.getElementById("tasktext").value;
		let statuslist = document.getElementById("modalstatuslist");
		let statustxt = statuslist.options[statuslist.selectedIndex].value;
		let task = { title: titletxt, status: statustxt }
		console.log(task.title + " " + task.status)
		if(titletxt !== ""){
			this.onsubmitCallbacks.forEach((x) => x(task))
			
		}
		this.close();
		document.getElementById("tasktext").value = "";
		
	}
	 /**
	 * Closes the modal box
	 */
	close(){
		let box = document.getElementById("myModal")
		box.style.display = "none"
	}
	
}





