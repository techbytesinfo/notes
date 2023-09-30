import { ITaskModel } from "app/notes/todos/models/tasks.model";

export interface TaskDialogData {
    taskData: ITaskModel;
    action: string;
    taskTable: ITaskModel;

}