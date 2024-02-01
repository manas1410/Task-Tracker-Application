import axios from "axios";

const Task_Api_Base_Url = "http://localhost:8080/api/v1/tasks";

class TaskService{
    getTasks(){
        return axios.get(Task_Api_Base_Url);
    }
   createTask(task){
        return axios.post(Task_Api_Base_Url,task);
    }

    getTaskById(taskId){
        return axios.get(Task_Api_Base_Url + "/" + taskId)
    }

    updateTask(task,taskId){
        return axios.put(Task_Api_Base_Url +"/" +taskId, task);
    }

    deleteTask(taskId){
        return axios.delete(Task_Api_Base_Url+"/"+taskId);
    }
}

export default new TaskService();