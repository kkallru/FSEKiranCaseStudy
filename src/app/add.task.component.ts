import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {Router} from "@angular/router";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-task-component',
  templateUrl: './add.task.component.html',
})


export class AddTaskComponent implements OnInit {

  public taskSearchResultSettings: any = [];
  public source: any[] = [];
  private tasksData: any[] = [];
  addTaskForm: FormGroup;
  private configUrl: string;
  private min = 0;
  private max = 10;

  constructor(private http: HttpClient, private router: Router, private task: Task, private fb: FormBuilder) {

    this.taskSearchResultSettings = {
      delete: {
        confirmDelete: true
      },
      columns: {
        taskName: {
          title: 'Task Name'
        },
        parentId: {
          title: 'Parent Task'
        },
        priority: {
          title: 'Priority',
          sort: true,
          sortDirection: 'desc'
        },
        startDate: {
          title: 'Start Date'
        },
        endDate: {
          title: 'End Date'
        },
        status: {
          title: 'Status'
        }
      },
      actions: {
        add: false,
        edit: false,
        delete: {
          confirmDelete: true
        }
      },
      pager: {
        perPage: 3
      }
    };
    this.addTaskForm = this.fb.group({
      taskName: [''],
      parentTask: [''],
      priority: [''],
      startDate: [''],
      endDate: [''],
      status: ['']
    });
  }

  ngOnInit() {
    this.configUrl = 'http://localhost:8080/rest/fse/allTasks';
    this.http.get(this.configUrl).subscribe((res: any) => {
        if (null !== res) {
          for (const task of res) {
            this.tasksData.push({
              taskName: task.taskName,
              parentId: task.parentId, priority: task.priority, startDate: task.startDate, endDate: task.endDate,
              taskId: task.taskId, status: this.getStatus(task.status)
            });
          }
          this.source = this.tasksData;
        }
      },
      (err: any) => {
        console.log(err);
      });
  }

  getStatus(status) {
    return status === false ? 'Open' : 'Closed';
  }

  save(model: this, event): void {
    console.log('Save the Task');
    this.configUrl = 'http://localhost:8080/rest/fse/saveAndRetrieveTask';
    let usrTask = new Task();
    const taskForm = this.addTaskForm;
    usrTask.taskName = taskForm.controls['taskName'].value;
    usrTask.parentId = taskForm.controls['parentTask'].value;
    usrTask.priority = taskForm.controls['priority'].value;
    usrTask.startDate = taskForm.controls['startDate'].value;
    usrTask.endDate = taskForm.controls['endDate'].value;

    this.http.post(this.configUrl, usrTask).subscribe((data: any)  => {
        if (null !== data) {
          for (const tasks of data) {
            this.tasksData.push({
              taskName: tasks.taskName,
              parentId: tasks.parentId, priority: tasks.priority, startDate: tasks.startDate, endDate: tasks.endDate
            });
          }
          this.source = this.tasksData;
          this.router.navigateByUrl('viewTasks');
        }
      },
      (err: any) => {
        console.log(err);
      });
  }
}

