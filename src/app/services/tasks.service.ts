import { Injectable } from '@angular/core';
import { ITaskModel } from 'app/notes/todos/models/tasks.model';
import { collectionData, Firestore, addDoc, collection, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private fireStore: Firestore) {
  }

 
  addTasks(todoList: ITaskModel) {
    const dbConnection = collection(this.fireStore, 'tasks');
    return addDoc(dbConnection, todoList);
  }

  getTasks(): Observable<any> {
    const dbConnection = collection(this.fireStore, 'tasks');
    const notesData = collectionData(dbConnection, { idField: 'id'});
   return notesData;
  }

  updateTasks(id: string, taskList: any) {
    const docInstance = doc(this.fireStore, 'tasks', id);
   return updateDoc(docInstance as any, taskList);
  }

  deleteTasks(id: string) {
    const docInstance = doc(this.fireStore, 'tasks', id);
    return deleteDoc(docInstance);
  }
}
