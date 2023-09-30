import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'app/services/notes.service';
import { DialogData, INoteList } from '../models/notelist-models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  todoTable!: INoteList;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    private NotesService: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fireStore: AngularFirestore
    ) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.NotesService.deleteNotes(this.data.todoTable.id).then(() => {
      this.dialogRef.close();
    });
  }
}
