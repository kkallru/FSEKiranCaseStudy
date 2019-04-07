import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ViewTasksComponent} from "./view.tasks.component";
import {RouterModule} from "@angular/router";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HttpClientModule} from "@angular/common/http";
import {Task} from "./model/Task";
import {EditTaskComponent} from "./edit.task.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "ng-sidebar";
import {TabModule} from "angular-tabs-component";
import {AddTaskComponent} from "./add.task.component";

@NgModule({
  declarations: [
    AppComponent, ViewTasksComponent, EditTaskComponent, AddTaskComponent
  ],
  imports: [
    BrowserModule, Ng2SmartTableModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    TabModule,
    RouterModule.forRoot( [
      {
        path: 'viewTasks',
        component: ViewTasksComponent
      },
      {
        path: 'editTask',
        component: EditTaskComponent
      },
      {
        path: 'addTask',
        component: AddTaskComponent
      }
    ])
  ],
  providers: [Task],
  bootstrap: [AppComponent]
})
export class AppModule { }
