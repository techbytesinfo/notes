import { CommonModule, DatePipe } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Inject,
  NO_ERRORS_SCHEMA,
  OnInit,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ITaskModel } from "app/notes/todos/models/tasks.model";
import { NotesService } from "app/services/notes.service";
import { TasksService } from "app/services/tasks.service";
import { TaskDialogData } from "../models/task.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-task-dialog",
  templateUrl: "./task-dialog.component.html",
  styleUrls: ["./task-dialog.component.scss"]
})
export class TaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  category = ["Recurring Task", "Sprint work"];
  dialogTitle = "Add Task";
  taskData!: ITaskModel;
  action!: string;
  status = ["Not yet started", "In progress", "Completed"]

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initiateForm();
    if (this.data.action === "edit") {
      this.editForm();
    }
  }

  initiateForm() {
    this.taskForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    });
  }

  editForm() {
    const date = new Date(this.data.taskData.date.toDate());
    console.log(date, 'date', this.data.taskData.date.toDate().toLocaleDateString());
    this.taskForm.controls["name"].setValue(this.data.taskData.name);
    this.taskForm.controls["date"].setValue(date);
    this.taskForm.controls["status"].setValue(this.data.taskData.status);
    this.taskForm.controls["category"].setValue(
      this.data.taskData.category
    );
  }

  submit() {
    const formValue: ITaskModel = {
      name: this.taskForm.controls["name"].value as string,
      date: this.taskForm.controls["date"].value,
      category: this.taskForm.controls["category"].value as string,
      status: this.taskForm.controls["status"].value as string
    };
    if (this.taskForm.valid) {
      
      if (this.data.action === 'add') {
      this.taskService
        .addTasks(formValue)
        .then((data) => {
          this.snackbar.open("Task added successfully", "close", {
            duration: 2000,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
      } else {
        this.taskService
        .updateTasks(this.data.taskData.id as any, formValue)
        .then((data) => {
          this.snackbar.open("Task updated successfully", "close", {
            duration: 2000,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
      }
  
      this.dialogRef.close(formValue);
    }
  }
}
