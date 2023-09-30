import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './todos/notes.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { DialogsComponent } from './todos/dialogs/dialogs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComponent } from './todos/delete/delete.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    NotesComponent,
    DialogsComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ComponentsModule,
    SharedModule,
    MatDialogModule,
    ClipboardModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
],
schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NotesModule { }
