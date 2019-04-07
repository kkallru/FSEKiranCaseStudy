package com.cognizant.fse.demo.repository;

import java.util.List;

import com.cognizant.fse.demo.model.Task;

public interface TaskService {
	
	public void createTask(Task task);
	public List<Task> getTasks();
	public Task findTaskById(Integer id);
	public Task update(Task task, Integer l);
	public void deleteTaskById(Integer id);
}
