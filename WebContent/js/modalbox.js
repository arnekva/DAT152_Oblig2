class ModalBox{

	constructor(){
		console.log("Toppen av modalbox")
		let modal = document.getElementById("myModal")

		let btn = document.getElementById("newtaskbtn")

		let span = document.getElementsByClassName("close")[0]
		this.currenttaskId=null;
		
		let modalcontent = document.getElementsByClassName("modalcontent")[0]
		
		
        this.prepareInputFields("Title", "title", modalcontent)
        this.appendOptions("Status", "status", modalcontent)	
        
        modalcontent.appendChild(document.createElement("br"))
        this.appendAddtaskButton(modalcontent);
		
		let addbtn = document.getElementById('modal-add-button')
		
		addbtn.onclick = function(){
			let alltasks = document.getElementsByClassName('statusChanger')
			let titletxt = document.getElementById('title').value
			let statustxt = document.getElementById('status').value
			let task = {id: alltasks.length+1,title: titletxt, status: gui.statuses[statustxt]}
			console.log(task)
			gui.addRow(task.id, task)
			modal.style.display = "none"
			document.getElementById('title').value = ""
		}
		
		btn.onclick = function(){
			modal.style.display = "block"
				console.log("test")
		}
		
		span.onclick = function(){
			modal.style.display = "none"
			document.getElementById('title').value = ""

		}
		
		window.onclick = function(event){
			if(event.target == modal){
				modal.style.display = "none"
				document.getElementById('title').value = ""
			}
			
		}
	}

	
	 prepareInputFields(labelText, id, parent) {
	        var outerDiv = document.createElement("div");

	        var label = document.createElement("label");
	        label.textContent = labelText + ": ";
	        label.htmlFor = id;
	        console.log("hfsfsd")
	        var input = document.createElement("input");
	        input.id = id;

	        outerDiv.appendChild(label);
	        outerDiv.appendChild(input);
	        parent.appendChild(outerDiv);
	    }
	 
	 
	 
	 fillInputFields(inputData) {
	        document.getElementById("title").value = inputData.title;
	    }
	
	 
	 appendAddtaskButton(modalcontent) {
	        var addbtn = document.createElement("button");
	        addbtn.id = "modal-add-button";
	        addbtn.textContent = "Add task";

	        // Hidden by default
	        modalcontent.appendChild(addbtn);
	    }
	 
	 appendOptions(labelText, id, parent){

	        var selectList = document.createElement("select");
			   selectList.setAttribute("id", id);
			   selectList.setAttribute("class", "statusChooser");

			   for (var j = 0; j < gui.statuses.length; j++) {
			     var option = document.createElement("option");
			     option.setAttribute("value", j);
			     option.text = gui.statuses[j];

			     selectList.appendChild(option);
			   }
			   
			   var outerDiv = document.createElement("div");

		        var label = document.createElement("label");
		        label.textContent = labelText + ": ";
		        label.htmlFor = id;

	        outerDiv.appendChild(label);
	        outerDiv.appendChild(selectList);
	        parent.appendChild(outerDiv);
	 }
	 

}
