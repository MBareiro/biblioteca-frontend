import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneficiaryDialogComponent } from './edit-beneficiary-dialog.component';

describe('EditBeneficiaryDialogComponent', () => {
  let component: EditBeneficiaryDialogComponent;
  let fixture: ComponentFixture<EditBeneficiaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBeneficiaryDialogComponent]
    });
    fixture = TestBed.createComponent(EditBeneficiaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
