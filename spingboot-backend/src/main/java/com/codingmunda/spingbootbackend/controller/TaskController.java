package com.codingmunda.spingbootbackend.controller;

import com.codingmunda.spingbootbackend.exception.ResourceNotFoundException;
import com.codingmunda.spingbootbackend.model.Task;
import com.codingmunda.spingbootbackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    @GetMapping("/tasks")
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    // Create Employee Rest api
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    //get employee by id rest api
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable long id){
        Task employee = taskRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Task not exist with id :"+id));
        return  ResponseEntity.ok(employee);
    }

    //Update Employee Rest Api
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){
        Task task = taskRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Task not exist with id :"+id));
        task.setTitle((taskDetails.getTitle()));
        task.setDescription(taskDetails.getDescription());
        task.setDue_date(taskDetails.getDue_date());
        Task updateTask = taskRepository.save(task);
        return ResponseEntity.ok(updateTask);
    }

    //Delete Employee Rest Api
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id){
        Task task = taskRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Task not exist with id :"+id));

        taskRepository.delete(task);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
