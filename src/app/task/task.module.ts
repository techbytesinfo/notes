import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDeleteDialogComponent } from './task-delete-dialog/task-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


@NgModule({
  declarations: [
    TaskComponent,
    TaskDialogComponent,
    TaskDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ComponentsModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TaskModule { }
