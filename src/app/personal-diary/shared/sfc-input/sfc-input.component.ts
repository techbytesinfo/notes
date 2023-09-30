import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sfc-input',
  templateUrl: './sfc-input.component.html',
  styleUrls: ['./sfc-input.component.scss']
})
export class SfcInputComponent {
@Input() type!: string;
@Input() placeholder!: string;

@Input() control!: any;
@Input() name!: string;

  constructor() { 
    this.control = new FormControl();
  } 

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'You must enter a value';
    }
    return this.control.hasError('email') ? 'Not a valid email' : '';
  }
}
