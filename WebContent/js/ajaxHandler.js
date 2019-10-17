"use strict";

class ajaxHandler {
	
	async allstatuses() {
	    const url='../TaskServices/broker/allstatuses'

	    try {
	        const response = await fetch(url,{method: "GET"})
	           
	            try{
	            	const json = await response.json()
	            	return json
	            } catch (error){
	            	console.log(error)
	            }
	       	} catch (error) {
	            console.log(error)
	        }  
	}
	
	async deleteTask(id) {
	    const url='../TaskServices/broker/task/' + id
	    try {
	        const response = await fetch(url,{method: "DELETE"})
	        try {
	        	const json = await response.json()
	            return json
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
	            body: JSON.stringify({'status': task.status})
	        })
	        try {
	        	const json = await response.json()
	            return json
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
	        	const json = await response.json()
	            return json
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
	        	const json = await response.json()
	            return json
	        } catch (error) {
	            console.log(error)
	        }            
	    } catch (error) {
	        console.log(error)
	    }
	}
}