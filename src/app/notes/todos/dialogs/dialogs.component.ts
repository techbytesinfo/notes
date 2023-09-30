import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotesService } from 'app/services/notes.service';
import { DialogData, INoteList } from '../models/notelist-models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {
  items$!: Observable<INoteList[]>;
  todosForm!: FormGroup;
  dialogTitle = 'Add Documentation';
  todoTable!: INoteList;
  action!: string;
  category = ['senses', 'commands', 'confluence', 'link', 'rop-portal'];
  noteId!: string;
  noteList!: INoteList[];

  constructor(public dialogRef: MatDialogRef<DialogsComponent>, private service: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackbar: MatSnackBar,
    private fireStore: AngularFirestore
    ) {
   
  }

  formAction() {
    if(this.data.action === 'add') {
      this.initiateForm();
    } else {
      this.editForm();
    }
  }

  editForm() {
    this.todosForm.controls['name']?.setValue(this.data.todoTable.name);
    this.todosForm.controls['document'].setValue(this.data.todoTable.document);
    this.todosForm.controls['category'].setValue(this.data.todoTable.category);
    this.noteId = this.data.todoTable.id;
  }

  ngOnInit() {
    this.initiateForm();
    this.formAction()
  }

  initiateForm() {
    this.todosForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  get formValues() {
    return this.todosForm.controls;
  }

  submit() {
    if(this.data.action === 'add') {
      this.addNotes();
    } else {
      this.updateNotes();
    }
   
  }

  addNotes() {
     const noteId = this.fireStore.createId();
    // campaignFields.compainId = id;
    //  await this.fireStore.collection('notes').doc(id).set(campaignFields);
    const payload = {
      name: this.formValues['name'].value,
      document: this.formValues['document'].value,
      date: new Date().toISOString(),
      id: noteId,
      category: this.formValues['category'].value
    }
     this.service.addNotes(payload).then(() => { 
      console.log('Document successfully written!');
        this.snackbar.open('Note added successfully', 'sucess');
      }).catch((error) => {
        console.error('Error writing document: ', error);
        this.snackbar.open('Error while adding note', 'error');
      });
    this.dialogRef.close();
  }

  updateNotes() {
    const payload = {
      name: this.formValues['name'].value,
      document: this.formValues['document'].value,
      category: this.formValues['category'].value,
      date: new Date().toISOString(),
      id: this.noteId
    }
    this.service.updateNotes(this.noteId, payload).then(() => {
      console.log('Document successfully written!');
    }).catch((error: Error) => {
      console.error('Error writing document: ', error);
    });
    this.dialogRef.close();
  }
}
