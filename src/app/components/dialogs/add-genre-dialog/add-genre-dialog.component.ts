import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-genre-dialog',
  templateUrl: './add-genre-dialog.component.html',
  styleUrls: ['./add-genre-dialog.component.css']
})
export class AddGenreDialogComponent {
  genreForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.genreForm = this.fb.group({
      name: ['', Validators.required],
      // Agrega más campos según tus necesidades
    });
  }

  save() {
    if (this.genreForm.valid) {
      this.dialogRef.close(this.genreForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
