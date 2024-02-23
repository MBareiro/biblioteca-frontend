import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from 'src/app/models/editorial';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-edit-genre-dialog',
  templateUrl: './edit-genre-dialog.component.html',
  styleUrls: ['./edit-genre-dialog.component.css']
})
export class EditGenreDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Genre,
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























