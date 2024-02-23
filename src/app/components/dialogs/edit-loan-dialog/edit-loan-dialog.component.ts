import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from 'src/app/models/loan';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-loan-dialog',
  templateUrl: './edit-loan-dialog.component.html',
  styleUrls: ['./edit-loan-dialog.component.css']
})
export class EditLoanDialogComponent {
  editForm: FormGroup;
  
  books: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditLoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Loan,
    private formBuilder: FormBuilder,
    private bookService: BooksService
  ) {
    this.editForm = this.formBuilder.group({
      loan_date: [data.loan_date, Validators.required],
      return_date: [data.return_date, Validators.required],
      returned: [data.returned, Validators.required],
      books_id: [data.books_id, Validators.required],
    });
  }
 
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      const updateAuthor: Loan = {
        ...this.data,
        ...this.editForm.value
      };
      this.dialogRef.close(updateAuthor);
    }
  }

  loadMetadata(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }
}
