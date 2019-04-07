import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {Router} from '@angular/router';
import {Task} from './model/Task';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'edit-task-component',
  templateUrl: './edit.task.component.html',
})


export class EditTaskComponent implements OnInit {

  editTaskForm: FormGroup;
  private title: 'Available Tasks';
  private source: any[] = [];
  private tasksData: any[] = [];
  private taskStatus: any[] = [];
  private configUrl: string;

  constructor(private http: HttpClient, private router: Router, private task: Task, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.configUrl = 'http://localhost:8080/rest/fse/allTasks';
    this.http.get(this.configUrl).subscribe((res: any) => {
        if (null !== res) {
          for (const task of res) {
            this.tasksData.push({
              taskName: task.taskName,
              parentId: task.parentId, priority: task.priority, startDate: task.startDate, endDate: task.endDate,
              taskId: task.taskId, status: task.status
            });
          }
          this.source = this.tasksData;
        }
      },
      (err: any) => {
        console.log(err);
      });
    this.editTaskForm = this.fb.group({
      editTask: [''],
      taskName: [''],
      parentTask: [''],
      priority: [''],
      startDate: [''],
      endDate: [''],
      status: ['']
    });
    this.taskStatus.push({code: true, value: 'Closed'},{code: false, value: 'Open'});
    this.configUrl = 'http://localhost:8080/rest/fse/allTasks';
  }

  updateFormFields(args: any) {
    let taskId = this.editTaskForm.controls['editTask'].value;
    this.configUrl = 'http://localhost:8080/rest/fse/' + taskId;
    this.http.get(this.configUrl).subscribe((res: any) => {
        if (null !== res) {
            let selectedTask = res;
            this.editTaskForm.controls['taskName'].patchValue(selectedTask.taskName);
            this.editTaskForm.controls['parentTask'].patchValue(selectedTask.parentId);
            this.editTaskForm.controls['priority'].patchValue(selectedTask.priority);
            this.editTaskForm.controls['startDate'].patchValue(selectedTask.startDate);
            this.editTaskForm.controls['endDate'].patchValue(selectedTask.endDate);
            this.editTaskForm.controls['status'].patchValue(selectedTask.status);
        }
      },
      (err: any) => {
        console.log(err);
      });
  }

  save(model: this): void {
    console.log('Save the Task');
    console.log('Save the Task');
    this.configUrl = 'http://localhost:8080/rest/fse/update';
    let usrTask = new Task();
    const taskForm = this.editTaskForm;
    usrTask.taskName = taskForm.controls['taskName'].value;
    usrTask.parentId = taskForm.controls['parentTask'].value;
    usrTask.priority = taskForm.controls['priority'].value;
    usrTask.startDate = taskForm.controls['startDate'].value;
    usrTask.endDate = taskForm.controls['endDate'].value;
    usrTask.taskId = taskForm.controls['editTask'].value;
    usrTask.status = taskForm.controls['status'].value;

    this.http.put(this.configUrl, usrTask).subscribe((data: any)  => {
        this.router.navigateByUrl('viewTasks');
      },
      (err: any) => {
        console.log(err);
      });
  }
}

