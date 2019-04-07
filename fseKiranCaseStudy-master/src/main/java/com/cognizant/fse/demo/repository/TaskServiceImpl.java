package com.cognizant.fse.demo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cognizant.fse.demo.model.Task;

public class TaskServiceImpl implements TaskService {

	public TaskServiceImpl() {}
	@Autowired
	TaskRepository taskRepository;
	
	@Override	
	public void createTask(Task task) {
		// TODO Auto-generated method stub
		taskRepository.save(task);
	}

	@Override
	public List<Task> getTasks() {
		// TODO Auto-generated method stub
		return (List<Task>) taskRepository.findAll();
	}

	/*
	 * @Override public Task findById(Integer id) { // TODO Auto-generated method
	 * stub // return Optional<Task>userRepo.findById(new
	 * Integer(String.valueOf(id))); return null; }
	 */

	@Override
	public Task update(Task task, Integer l) {
		// TODO Auto-generated method stub
		return taskRepository.save(task);
	}

	@Override
	public void deleteTaskById(Integer id) {
		// TODO Auto-generated method stub
		taskRepository.deleteById(id);
	}

	@Override
	public Task findTaskById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
