package com.cognizant.fse.demo.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.lang.Nullable;

@Entity
public class Task {

	 public Task() {		 
	 }
	 
	 @Id
	 @GeneratedValue
	 @Column(name="TASK_ID")
	 private Integer taskId;
	 @Column(name="PARENT_ID")
	 @Nullable
	 private Integer parentId;
	 @Column(name="TASK_NAME")
	 @Nullable
	 private String taskName;
	 @Column(name="START_DATE")
	 @Nullable
	 private Date startDate;
	 @Column(name="END_DATE")
	 @Nullable
	 private Date endDate;
	 @Column(name="PRIORITY")
	 @Nullable
	 private Integer priority;
	 @Column(name="STATUS")
	 @Nullable
	 private boolean status;
	 
	public Integer getTaskId() {
		return taskId;
	}
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(Integer priority) {
		this.priority = priority;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}

}
