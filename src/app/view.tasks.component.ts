import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {Router} from "@angular/router";
import {Task} from "./model/Task";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'view-tasks-component',
  templateUrl: './view.tasks.component.html',
})


export class ViewTasksComponent implements OnInit {

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

  deleteRecord(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.delete('http://localhost:8080/rest/fse/' + event.data.taskId).subscribe(data => {
          console.log('Record Deleted Successfully ' + data);
          event.confirm.resolve();
        },
        error1 => {
          console.log('error while deleting record');
        });
    } else {
        event.confirm.reject();
      }
  }
}

