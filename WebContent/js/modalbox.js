class ModalBox{

	constructor(){
		let modal = document.getElementById("myModal")

		let btn = document.getElementById("newtaskbtn")

		let span = document.getElementsByClassName("close")[0]
		this.currenttaskId=null;
		
		let modalcontent = document.getElementsByClassName("modalcontent")[0]
		
        this.prepareInputFields("Title", "title", modalcontent)
        this.prepareInputFields("Status", "status", modalcontent)
        
        modalcontent.appendChild(document.createElement("br"))
        this.appendAddtaskButton(modalcontent);
        this.appendUpdatetaskButton(modalcontent);
		
		btn.onclick = function(){
			modal.style.display = "block"
				console.log("test")
		}
		
		span.onclick = function(){
			modal.style.display = "none"
		}
		
		window.onclick = function(event){
			if(event.target == modal){
				modal.style.display = "none"
			}
			
		}
	}
	
	 prepareInputFields(labelText, id, parent) {
	        var outerDiv = document.createElement("div");

	        var label = document.createElement("label");
	        label.textContent = labelText + ": ";
	        label.htmlFor = id;

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
	        addbtn.style.display = "none";
	        modalcontent.appendChild(addbtn);
	    }
	
	 appendUpdatetaskButton(modalcontent) {
	        var btn = document.createElement("button");
	        btn.id = "modal-update-button";
	        btn.textContent = "Update task";

	        // Hidden by default
	        btn.style.display = "none";
	        modalcontent.appendChild(btn);
	    }
	 
	
}

	