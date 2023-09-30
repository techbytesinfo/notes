import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcInputComponent } from './sfc-input.component';

describe('SfcInputComponent', () => {
  let component: SfcInputComponent;
  let fixture: ComponentFixture<SfcInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfcInputComponent]
    });
    fixture = TestBed.createComponent(SfcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
