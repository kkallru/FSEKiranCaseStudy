package com.cognizant.fse.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.fse.demo.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
