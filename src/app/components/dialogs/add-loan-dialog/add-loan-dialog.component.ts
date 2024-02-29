import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Beneficiary } from 'src/app/models/beneficiary';
import { Book } from 'src/app/models/book';
import { Loan } from 'src/app/models/loan';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { BooksService } from 'src/app/services/books.service';
import { LoanService } from 'src/app/services/loan.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-add-loan-dialog',
  templateUrl: './add-loan-dialog.component.html',
  styleUrls: ['./add-loan-dialog.component.css'],
})
export class AddLoanDialogComponent {
  loan: Loan = {
    id: 0,
    loan_date: new Date(),
    return_date: new Date(),
    returned: false,
    beneficiaries_id: 0,
    books_id: 0,
  };
  loanForm: FormGroup;
  beneficiaries: Beneficiary[] = [];
  books: Book[] = [];
  availableBooks: Book[] = [];
  minDate: Date;
  
  constructor(
    private dialogRef: MatDialogRef<AddLoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loanService: LoanService,
    private beneficiaryService: BeneficiariesService,
    private bookService: BooksService,
    private subscriptionService: SubscriptionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loanForm = this.fb.group({
      loan_date: [new Date(), Validators.required],
      return_date: ['', Validators.required],
      returned: false,
      beneficiaries_id: 0,
      books_id: 0,
      // Agrega más campos según tus necesidades
    });
    const currentDay = new Date(); // Obtiene la fecha actual
    this.minDate = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate() + 1
    );
  }

  ngOnInit(): void {
    this.loadBeneficiaries();
    this.loadBooks();
  }

  loadBeneficiaries(): void {
    this.beneficiaryService
      .getBeneficiaries()
      .subscribe((data: Beneficiary[]) => {
        this.beneficiaries = data;
      });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.filterAvailableBooks(); // Filtra los libros disponibles
    });
  }

  // Método para filtrar los libros disponibles
  filterAvailableBooks(): void {
    this.availableBooks = this.books.filter((book) => book.available > 0);
  }

  save(): void {
    if (this.loanForm.valid) {
      const selectedBeneficiaryId = this.loanForm.value.beneficiaries_id;
      console.log(selectedBeneficiaryId);
      
      // Verificar si el beneficiario tiene préstamos pendientes de devolución
      this.loanService.checkLoans(selectedBeneficiaryId).subscribe(
        (hasPendingLoans: boolean) => {
          console.log("wtf");
          
          if (!hasPendingLoans) {
            // El beneficiario no tiene préstamos pendientes de devolución, continuar con la verificación de la suscripción
            this.subscriptionService.checkSubscriptionValidity(selectedBeneficiaryId).subscribe(
              (hasSubscription: boolean) => {
                if (hasSubscription) {
                  // Si el beneficiario tiene una suscripción vigente, cerrar el diálogo y guardar el préstamo
                  this.dialogRef.close(this.loanForm.value);
                } else {
                  this.snackBar.open('El beneficiario seleccionado no tiene una suscripción vigente.', 'Cerrar', {
                    duration: 4000,
                  });
                }
              },
              (error) => {
                console.error('Error al verificar la suscripción:', error);
              }
            );
          } else {
            // El beneficiario tiene préstamos pendientes de devolución
            this.snackBar.open('El beneficiario tiene libros pendientes de devolución.', 'Cerrar', {
              duration: 4000,
            });
          }
        },
        (error) => {
          console.error('Error al verificar préstamos pendientes de devolución:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  onBeneficiarySelectionChange(): void {
    const selectedBeneficiaryId = this.loanForm.value.beneficiaries_id;
    this.subscriptionService
      .checkSubscriptionValidity(selectedBeneficiaryId)
      .subscribe(
        (hasSubscription: boolean) => {
          if (!hasSubscription) {            
            this.snackBar.open('El beneficiario seleccionado no tiene una suscripción vigente.', 'Cerrar', {
              duration: 4000,
            });
          }
        },
        (error) => {
          console.error('Error al verificar la suscripción:', error);
        }
      );
  }
/* 
  openAddBookDialog(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.bookService.addBook(result).subscribe(
          (createdEditorial: Book) => {
            this.snackBar.open('Editorial creada con éxito', 'Cerrar', {
              duration: 4000,
            });
            this.bookService.getBooks().subscribe((books) => {
              this.books = books;
              this.loanForm.patchValue({
                editorialId: createdEditorial.id,
              });
            });
          },
          (error) => {
            console.error('Error al crear el libro', error);
          }
        );
      }
    });
  } */
}
