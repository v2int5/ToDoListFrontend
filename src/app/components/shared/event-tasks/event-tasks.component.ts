import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../../service/task.service";
import {TaskModel} from "../../../model/task.model";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {EventModel} from "../../../model/event.model";

@Component({
  selector: 'app-event-tasks',
  templateUrl: './event-tasks.component.html',
  styleUrls: ['./event-tasks.component.css']
})
export class EventTasksComponent implements OnInit, OnDestroy {
  faPlus = faPlus;


  private subscriptions: Subscription[] = [];
  tasks: TaskModel[] = [];


  @Input("event") event!: EventModel;
  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.subscriptions.push(
      this.taskService.loadTasksByEvent(this.event.id).subscribe(response => {
        this.tasks = response;
        this.tasks.forEach(task => task.eventId = this.event.id)
      })
    )
  }

  ngOnDestroy(): void {
    this.tasks = [];
    this.subscriptions.forEach((sub => sub.unsubscribe()));

  }


}
