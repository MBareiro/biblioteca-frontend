import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanDialogComponent } from './add-loan-dialog.component';

describe('AddLoanDialogComponent', () => {
  let component: AddLoanDialogComponent;
  let fixture: ComponentFixture<AddLoanDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanDialogComponent]
    });
    fixture = TestBed.createComponent(AddLoanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
