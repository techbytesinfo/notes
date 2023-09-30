export interface INoteList {
    name: string;
    document: string;
    date: string;
    id: string;
    noteId?: string;
    category?: string;
}


export const NoteListModel = (record: any): INoteList  => ({
    name: record.name.toLowerCase(),
    document: record.document,
    date: record.date,
    id: record.id
  });


  export interface DialogData {
    id: string;
    action: string;
    todoTable: INoteList;
    noteList: INoteList[];
  }
  