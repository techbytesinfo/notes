import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteComponent } from 'app/notes/todos/delete/delete.component';
import { ITaskModel } from 'app/notes/todos/models/tasks.model';
import { TasksService } from 'app/services/tasks.service';
import { TaskDialogData } from '../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-delete-dialog',
  templateUrl: './task-delete-dialog.component.html',
  styleUrls: ['./task-delete-dialog.component.scss']
})
export class TaskDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private snackbar: MatSnackBar
    ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.taskService.deleteTasks(this.data.taskData.id as string).then(() => {
      this.snackbar.open('Task deleted successfully', 'close', {
        duration: 2000
      });
      this.dialogRef.close();
    });
  }
}
