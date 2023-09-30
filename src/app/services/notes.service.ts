import { Injectable } from '@angular/core';
import { INoteList } from 'app/notes/todos/models/notelist-models';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, addDoc, collection, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<INoteList>;

  constructor(
    private fireStore: Firestore) {
  }

 
  addNotes(todoList: INoteList) {
    const dbConnection = collection(this.fireStore, 'notes');
    return addDoc(dbConnection, todoList);
  }

  getNotes(): Observable<any> {
    const dbConnection = collection(this.fireStore, 'notes');
    const notesData = collectionData(dbConnection, { idField: 'id'});
   return notesData;
  }

  updateNotes(id: string, noteList: INoteList) {
    const docInstance = doc(this.fireStore, 'notes', id);
   return updateDoc(docInstance as any, noteList);
  }

  deleteNotes(id: string) {
    const docInstance = doc(this.fireStore, 'notes', id);
    return deleteDoc(docInstance);
  }
 
}