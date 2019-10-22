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
	
	async deleteTask(id, callback) {
	    const url='../TaskServices/broker/task/' + id
	    try {
	        const response = await fetch(url,{method: "DELETE"})
	        console.log(response)
	        console.log("Deleted task with id " + id)
	        callback(id)
	    } catch (error) {
	        console.log(error)
	    }
	}
	
	async modifyStatus(id, status, callback) {
	    const url='../TaskServices/broker/task/' + id 
	    try {
	        const response = await fetch(url,{
	            method: "PUT",
	            headers: {"Content-Type": "application/json; charset=utf-8"},
	            body: JSON.stringify({'status': status})
	        })
	        console.log("Changed status on task with id " + id + " to " + status)
	        callback(id, status)
	    } catch (error) {
	        console.log(error)
	    }
	}
	
	async addNewTask(task, callback) {
	    const url='../TaskServices/broker/task'
	    try {
	        const response = await fetch(url,{
	            method: "POST",
	            headers: {"Content-Type": "application/json; charset=utf-8"},
	            body: JSON.stringify({"title":task.title, "status": task.status})
	        })
	        try {
	        	let json = await response.json()
	        	task.id = json.task.id
	        	callback(task)
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