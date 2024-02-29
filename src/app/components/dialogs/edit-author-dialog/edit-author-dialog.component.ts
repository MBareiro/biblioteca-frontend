import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beneficiary } from 'src/app/models/beneficiary';

@Component({
  selector: 'app-edit-author-dialog',
  templateUrl: './edit-author-dialog.component.html',
  styleUrls: ['./edit-author-dialog.component.css']
})
export class EditAuthorDialogComponent {
    editForm: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<EditAuthorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Beneficiary,
      private formBuilder: FormBuilder
    ) {
      this.editForm = this.formBuilder.group({
        name: [this.capitalizeFirstLetter(data.name), Validators.required],/* 
        last_name: [this.capitalizeFirstLetter(data.last_name), Validators.required], */
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSaveClick(): void {
      if (this.editForm.valid) {
        const updateAuthor: Beneficiary = {
          ...this.data,
          ...this.editForm.value
        };
        this.dialogRef.close(updateAuthor);
      }
    }  
  
    private capitalizeFirstLetter(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }




}
