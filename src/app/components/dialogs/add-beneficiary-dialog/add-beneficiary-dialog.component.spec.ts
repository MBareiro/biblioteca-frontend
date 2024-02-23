import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaryDialogComponent } from './add-beneficiary-dialog.component';

describe('AddBeneficiaryDialogComponent', () => {
  let component: AddBeneficiaryDialogComponent;
  let fixture: ComponentFixture<AddBeneficiaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBeneficiaryDialogComponent]
    });
    fixture = TestBed.createComponent(AddBeneficiaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
