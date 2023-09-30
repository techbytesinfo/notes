// create routing for personal diary
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDiaryComponent } from './personal-diary.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalDiaryComponent
  }
];


@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PersonalDiaryRoutingModule { }