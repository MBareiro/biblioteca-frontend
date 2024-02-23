import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from '../../../models/beneficiary';

@Component({
  selector: 'app-edit-beneficiary-dialog',
  templateUrl: './edit-beneficiary-dialog.component.html',
  styleUrls: ['./edit-beneficiary-dialog.component.css']
})
export class EditBeneficiaryDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditBeneficiaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beneficiary,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      last_name: [data.last_name, Validators.required],
      phone: [data.phone, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const updatedBeneficiary: Beneficiary = {
        ...this.data,
        ...this.editForm.value
      };
      this.dialogRef.close(updatedBeneficiary);
    }
  }
}
