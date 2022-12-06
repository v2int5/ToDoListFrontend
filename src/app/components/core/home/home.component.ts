import {Component, OnInit, ViewChild} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskFilterEnum} from "../../../enum/task-filter.enum";
import {UserTasksComponent} from "../../shared/user-tasks/user-tasks.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  @ViewChild(UserTasksComponent) tasksComponent!: UserTasksComponent;
  faPlus = faPlus;


  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  filterTasks(selectedTask: TaskFilterEnum){
    this.tasksComponent.loadTasksWithFilter(selectedTask);
  }


  createNewTask() {
    this.tasksComponent.createNewTask();
  }

  createNewEvent() {
      this.router.navigateByUrl("/event/edit/new")
  }
}
