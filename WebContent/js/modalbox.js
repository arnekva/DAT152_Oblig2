class ModalBox{

	constructor(){
		let modal = document.getElementById("myModal")

		let btn = document.getElementById("newtaskbtn")

		let span = document.getElementsByClassName("close")[0]
		this.currenttaskId=null;
		
		let modalcontent = document.getElementsByClassName("modalcontent")[0]
		
		
        this.prepareInputFields("Title", "title", modalcontent)
        this.appendOptions("Status", "status", modalcontent)	
        
        modalcontent.appendChild(document.createElement("br"))
        this.appendAddtaskButton(modalcontent);
		
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
	        modalcontent.appendChild(addbtn);
	    }
	 
	 appendOptions(labelText, id, parent){

	        var selectList = document.createElement("select");
			   selectList.setAttribute("id", id);
			   selectList.setAttribute("class", "statusChooser");

			   for (var j = 0; j < statuses.length; j++) {
			     var option = document.createElement("option");
			     option.setAttribute("value", j);
			     option.text = statuses[j];

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

	