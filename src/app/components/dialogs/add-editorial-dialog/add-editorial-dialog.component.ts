// add-editorial-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-editorial-dialog',
  templateUrl: 'add-editorial-dialog.component.html',
})
export class AddEditorialDialogComponent {
  editorialForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEditorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editorialForm = this.fb.group({
      name: ['', Validators.required],
      // Agrega más campos según tus necesidades
    });
  }

  save() {
    if (this.editorialForm.valid) {
      this.dialogRef.close(this.editorialForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
