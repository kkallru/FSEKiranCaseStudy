import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewTasksComponent} from "./view.tasks.component";
import {EditTaskComponent} from "./edit.task.component";
import {AddTaskComponent} from "./add.task.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  routes = ([
    {
      path: '/viewTasks',
      component: ViewTasksComponent
    },
    {
      path: '/editTask',
      component: EditTaskComponent
    },
    {
      path: '/addTask',
      component: AddTaskComponent
    }
  ]);
}
