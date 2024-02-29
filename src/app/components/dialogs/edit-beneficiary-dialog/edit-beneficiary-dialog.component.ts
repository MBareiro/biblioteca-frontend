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
  minDate: Date;
  constructor(
    public dialogRef: MatDialogRef<EditBeneficiaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Beneficiary,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      last_name: [data.last_name, Validators.required],
      phone: [data.phone, Validators.required],
      address: [data.address, Validators.required],
      dni: [data.dni, Validators.required],
      birthdate: [new Date(data.birthdate), Validators.required],
    });
    const currentDay = new Date(); // Obtiene la fecha actual
    this.minDate = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() 
    );
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
