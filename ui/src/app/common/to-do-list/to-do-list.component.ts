import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../../app.model';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent implements OnInit {

  toDoList: ToDoItem[] = [];
  newTaskName: string = '';
  newTaskDueDate: Date = new Date();

  constructor(private AppService: AppService) { }
  ngOnInit(): void {
    this.loadToDoList();
  }

  loadToDoList(): void {
    this.AppService.getToDoList().subscribe((tasks: ToDoItem[]) => {
      this.toDoList = tasks;
    });
  }

  addToDo(): void {
    if (!this.newTaskName.trim()) return;

    const dueDateFormatted = new Date(this.newTaskDueDate).toISOString();

    const newTask: ToDoItem = {
      name: this.newTaskName,
      dueDate: dueDateFormatted,
      completed: false
    };

    this.AppService.addToDo(newTask).subscribe((task: ToDoItem) => {
      this.toDoList.push(task);
      this.newTaskName = '';
      this.newTaskDueDate = new Date();
    });
  }

  updateTask(task: ToDoItem): void {
    if (task.id) {
      this.AppService.updateToDoItem(task.id, task).subscribe(updatedTask => {
        const index = this.toDoList.findIndex(t => t.id === task.id);
        if (index > -1) {
          this.toDoList[index] = updatedTask;
        }
      });
    }
  }

  deleteTask(id: number) {
    this.AppService.deleteToDoItem(id).subscribe(() => {
      this.toDoList = this.toDoList.filter(t => t.id !== id);
    });
  }
}
