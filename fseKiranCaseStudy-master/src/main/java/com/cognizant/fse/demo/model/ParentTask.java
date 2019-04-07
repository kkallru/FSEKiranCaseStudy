package com.cognizant.fse.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.lang.Nullable;

@Entity
public class ParentTask {

	@Id
	@GeneratedValue
	@Column(name = "PARENT_ID")
	private Integer parentId;
	@Column(name = "TASK")
	@Nullable
	private Integer taskId;
	
	public Integer getTaskId() {
		return taskId;
	}
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
}
