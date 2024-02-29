import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent {
  authorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],/* 
      last_name: ['', Validators.required], */
      // Agrega más campos según tus necesidades
    });
  }

  save() {
    console.log("asdasd");
    
    if (this.authorForm.valid) {
      this.dialogRef.close(this.authorForm.value);
    } else {
      console.log("Complete lo");
      
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
