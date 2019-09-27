"use strict";

class ajaxHandler {
	
	async allstatuses() {
	    const url='../TaskServices/broker/allstatuses'

	    try {
	        const response = await fetch(url,{method: "GET"})
	           
	            try{
	            	const text = await response.text()
		            console.log(text)
	            	return text
	            } catch (error){
	            	console.log(error)
	            }
	       	} catch (error) {
	            console.log(error)
	        }
	        
	}
	
	async deleteTask() {
	    const url='../TaskServices/broker/task/2'
	    try {
	        const response = await fetch(url,{method: "DELETE"})
	        try {
	            const text = await response.text()
	            console.log(text)
	        } catch (error) {
	            console.log(error)
	        }
	    } catch (error) {
	        console.log(error)
	    }
	}
	
	async modifyStatus(task) {
	    const url='../TaskServices/broker/task/' + task.id 
	    try {
	        const response = await fetch(url,{
	            method: "PUT",
	            headers: {"Content-Type": "application/json; charset=utf-8"},
	            body: JSON.stringify({'status': 'DONE'})
	        })
	        try {
	            const text = await response.text()
	            console.log(text)
	        } catch (error) {
	            console.log(error)
	        }
	    } catch (error) {
	        console.log(error)
	    }
	}
	
	async addNewTask(task) {
	    
	    const url='../TaskServices/broker/task'
	    try {
	        const response = await fetch(url,{
	            method: "POST",
	            headers: {"Content-Type": "application/json; charset=utf-8"},
	            body: JSON.stringify({"title":task.title, "status": task.status})
	        })
	        try {
	            const text = await response.text()
	            console.log(text)
	            return text
	        } catch (error) {
	            console.log(error)
	        }
	    } catch (error) {
	        console.log(error)
	    }
	}
	
	async getAllTasks() {
	    const url='../TaskServices/broker/tasklist'
	    try {
	        const response = await fetch(url,{method: "GET"})
	        try {
	            const tasks = await response.text()
	            console.log(tasks)
	            return tasks
	        } catch (error) {
	            console.log(error)
	        }            
	    } catch (error) {
	        console.log(error)
	    }
	}
	
}