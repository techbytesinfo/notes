import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from './dialogs/dialogs.component';
import { NotesService } from 'app/services/notes.service';
// import { Observable } from 'rxjs';
import { INoteList } from './models/notelist-models';
// import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DeleteComponent } from './delete/delete.component';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes!: string[];
  todos$!: Observable<INoteList[]>;
  dataSource!: INoteList[];
  displayedColumns = ['id','date', 'name', 'document', 'actions'];
  category = ['senses', 'commands', 'confluence', 'link', 'rop-portal'];

  @ViewChildren('tableBodyRow', {read: ElementRef}) renderedBodyRows!: QueryList<
    ElementRef<HTMLTableRowElement>
  >;
  groupData!: any[];
  page!: string;

  constructor(private $dialog: MatDialog, private service: NotesService, 
    private dialog: MatDialog, private clipBoard: Clipboard, private snackbar: MatSnackBar, private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
      this.getNoteList();
  }
  
  selectOption(event: any) {
    this.page = event.value;
  }

  addImportantNotes() {
    this.$dialog.open(DialogsComponent, {
      data: {
        action: 'add',
        noteList: this.dataSource
      },
      width: '40%'
    });
  }

  getNoteList() {
    this.todos$ = this.service.getNotes();
    this.todos$.subscribe((data) => {
      this.dataSource = data;
      this.dataSource.map((item: INoteList, index: number) => {
        item.noteId = JSON.stringify(index + 1)
      });
     this.groupData = this.splitArrayBasedOnCategory(this.dataSource);
    });
  }

 splitArrayBasedOnCategory(data: INoteList[]) {
  const category = ['senses', 'commands', 'confluence', 'link', 'rop-portal'];
  const categoryData: INoteList[][] = [];
  category.forEach((item) => {
    const filteredData = data.filter((dataItem) => dataItem.category === item);
    categoryData.push(filteredData);
  });
  return categoryData;
  }

  editCall(data: INoteList) {
    this.dialog.open(DialogsComponent, {
      data: {
        todoTable: data,
        action: 'edit',
      },
      width: '40%'
    });
  }

  deleteCall(data: INoteList) {
    this.dialog.open(DeleteComponent, {
      data: {
        todoTable: data,
        action: 'delete',
      },
      width: '20%'
    });
  }
  copyDocument(row: INoteList) {
    // const document = this.document.nativeElement.innerText;
    const pending = this.clipBoard.beginCopy(row.document);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
    this.snackbar.open('Document copied successfully', 'sucess')
  }

  setTitle(data: any) {
    if(data.length > 0) {
      return data[0].category.slice(0, 1).toUpperCase() + data[0].category.slice(1);
    } else {
      return '';
    }
  }

  

}
