import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-diary',
  templateUrl: './personal-diary.component.html',
  styleUrls: ['./personal-diary.component.scss']
})
export class PersonalDiaryComponent {

  userForm = new FormGroup({  
    firstName: new FormControl('', [Validators.required]),
  });
  firstName = new FormControl('', [Validators.required]);
  constructor() {
  
  }

  ngOnInit(): void {

  }
}
