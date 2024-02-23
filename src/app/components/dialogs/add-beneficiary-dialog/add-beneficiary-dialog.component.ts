import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-beneficiary-dialog',
  templateUrl: './add-beneficiary-dialog.component.html',
  styleUrls: ['./add-beneficiary-dialog.component.css']
})
export class AddBeneficiaryDialogComponent {
  subscriptionMonthsOptions: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  beneficiaryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddBeneficiaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.beneficiaryForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  save() {
    if (this.beneficiaryForm.valid) {
      const formData = this.beneficiaryForm.value;



      this.dialogRef.close(formData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
