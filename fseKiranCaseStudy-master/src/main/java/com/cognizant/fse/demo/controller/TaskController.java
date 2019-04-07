package com.cognizant.fse.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.cognizant.fse.demo.model.Task;
import com.cognizant.fse.demo.repository.TaskRepository;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(value = "/rest/fse")
public class TaskController {

	@Autowired
	TaskRepository taskRepo;

	@GetMapping(value = "/allTasks", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Task> getTasks() {
		return taskRepo.findAll();
	}

	@PostMapping(value = "/saveAndRetrieveTask", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Task> saveAndRetrieveTask(@RequestBody final Task task) {
		taskRepo.save(task);
		return getTasks();
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> getTaskById(@PathVariable("id") Integer id) {
		Task task = taskRepo.findById(id).orElse(new Task());
		if (task == null) {
			return new ResponseEntity<Task>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}

	@PostMapping(value = "/create", headers = "Accept=application/json")
	public ResponseEntity<Void> createTask(@RequestBody Task task, UriComponentsBuilder ucBuilder) {
		taskRepo.save(task);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/task/{id}").buildAndExpand(task.getTaskId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

	@PutMapping(value = "/update", headers = "Accept=application/json")
	public ResponseEntity<String> updateTask(@RequestBody Task currentTask) {
		Task task = taskRepo.findById(currentTask.getTaskId()).orElse(new Task());
		if (task == null) {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		task = currentTask;
		taskRepo.save(task);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", headers = "Accept=application/json")
	public ResponseEntity<Task> deleteTask(@PathVariable("id") Integer id) {
		taskRepo.deleteById(id);
		return new ResponseEntity<Task>(HttpStatus.NO_CONTENT);
	}

}
