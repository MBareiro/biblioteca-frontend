import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from 'src/app/models/editorial';

@Component({
  selector: 'app-edit-editorial-dialog',
  templateUrl: './edit-editorial-dialog.component.html',
  styleUrls: ['./edit-editorial-dialog.component.css']
})
export class EditEditorialDialogComponent { 
      editForm: FormGroup;
    
      constructor(
        public dialogRef: MatDialogRef<EditEditorialDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Editorial,
        private formBuilder: FormBuilder
      ) {
        this.editForm = this.formBuilder.group({
          name: [this.capitalizeFirstLetter(data.name), Validators.required],
        });
      }
    
      onNoClick(): void {
        this.dialogRef.close();
      }
    
      onSaveClick(): void {
        if (this.editForm.valid) {
          const updateAuthor: Editorial = {
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
  






    
  
  
    
    
  
  








