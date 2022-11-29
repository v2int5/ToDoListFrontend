import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {Task} from "../../model/task";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  private subscriptions: Subscription[] = [];
  tasks: Task[] = [];
  viewTaskComponentOpen = false; //enables or disables task create/edit component
  userId = 0; //used when getting tasks from user
  taskId = 0; //used when a task view is initialized
  constructor(private taskService: TaskService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalCache()
    this.userId = user.id;
    this.loadTasks();
  }

  loadTasks(){
    this.subscriptions.push(
      this.taskService.loadTasksFromDB(this.userId).subscribe(response => {
        this.tasks = response;
      }));
  }


  deleteTask(id: number) {
    this.subscriptions.push(
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      }));
  }

  taskDropped(task: Task, dropPoint: CdkDragEnd) {
    task.xLocation = dropPoint.source.getFreeDragPosition().x
    task.yLocation = dropPoint.source.getFreeDragPosition().y
    this.subscriptions.push(this.taskService.moveTask(task).subscribe());
  }

  getTaskLocation(task: Task) {
    return {x: task.xLocation, y: task.yLocation};
  }



  setViewTask(bool: boolean, taskId:number) {
    this.taskId = taskId;
    this.viewTaskComponentOpen = bool;
    this.loadTasks(); //

  }



  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));
    this.userId = 0;
  }

  //Temporary methods for development



  addTestTask() { //TODO: move logic to task view component
    console.log("new task")
    const newTask =
      new Task(0,
        new Date(),
        this.isCompleteRandom(),
        "test",
        this.getRandomString(50),
        this.getRandomInt(500),
        this.getRandomInt(300),
        this.getRandomColor(),
        this.userId);
    this.subscriptions.push(this.taskService.addTask(newTask)
        .subscribe(() => {
          this.loadTasks();
        }));
  }

  getRandomString(max: number): string {
    const loremIpsum = "Lorem ipsum dolor sit amet, " +
      "consectetur adipiscing elit, sed do eiusmod tempor " +
      "incididunt ut labore et dolore magna aliqua. " +
      "Ut enim ad minim veniam, quis nostrud exercitation " +
      "ullamco laboris nisi ut aliquip ex ea commodo consequat."
    return loremIpsum.substring(0, this.getRandomInt(max))
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  isCompleteRandom(): boolean {
    return Math.random() > 0.5;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }


}