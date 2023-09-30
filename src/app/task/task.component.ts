import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITaskModel } from 'app/notes/todos/models/tasks.model';
import { TasksService } from 'app/services/tasks.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog/task-delete-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskList!: ITaskModel[];
  displayedColumns = ["select", "id", "date", "name", "status", "actions"];
  selection = new SelectionModel<ITaskModel>(true, []);
  dataSource!: any;

  constructor(private taskService: TasksService, private $dialog: MatDialog) { }

  ngOnInit(): void {
      this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.dataSource = data;
      this.dataSource.map((item: ITaskModel, index: number) => {
        item.taskId = JSON.stringify(index + 1)
      });
    });
  }

  //  /** Whether the number of selected elements matches the total number of rows. */
  //  isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //  // const numRows = this.dataSource.renderedData.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row: ITaskModel) =>
  //         this.selection.select(row)
  //       );
  // }

  addTask() {
    this.$dialog.open(TaskDialogComponent, {
      data: {
        action: 'add',
        noteList: this.dataSource
      },
      width: '40%'
    });
  }

  editTask(row: ITaskModel) {
    this.$dialog.open(TaskDialogComponent, {
      data: {
        action: 'edit',
        taskData: row
      },
      width: '40%'
    });
  }

  deleteTask(row: ITaskModel) {
    this.$dialog.open(TaskDeleteDialogComponent, {
      data: {
        action: 'delete',
        taskData: row
      },
      width: '40%'
    });
  }
}
