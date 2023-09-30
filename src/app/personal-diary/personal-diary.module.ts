import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDiaryRoutingModule } from './personal-diary-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { PersonalDiaryComponent } from './personal-diary.component';
import { SfcInputComponent } from './shared/sfc-input/sfc-input.component';



@NgModule({
  declarations: [PersonalDiaryComponent, SfcInputComponent],
  imports: [
    CommonModule,
    PersonalDiaryRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class PersonalDiaryModule { }
