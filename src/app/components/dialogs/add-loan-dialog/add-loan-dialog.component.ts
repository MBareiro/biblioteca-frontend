import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Beneficiary } from 'src/app/models/beneficiary';
import { Book } from 'src/app/models/book';
import { Loan } from 'src/app/models/loan';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { BooksService } from 'src/app/services/books.service';
import { LoanService } from 'src/app/services/loan.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { StockDialogComponent } from '../stock-dialog/stock-dialog.component';
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
      beneficiaries_id: ['', Validators.required],
      books_id: ['', Validators.required],
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
      /* this.filterAvailableBooks();  */ // Filtra los libros disponibles
    });
  }

  save(): void {
    if (this.loanForm.valid) {
      const selectedBookId = this.loanForm.value.books_id;

      // Verificar si hay copias disponibles del libro seleccionado
      let selectedBook = this.books.find(
        (book) => book.id === selectedBookId
      );
      
      if (selectedBook && selectedBook.available <= 0) {
        /* this.snackBar.open(
          'No hay copias disponibles de este libro.',
          'Cerrar',
          {
            duration: 4000,
          }
        );    */         
                
        const dialogRefStock = this.dialog.open(StockDialogComponent, {
          data: {
            message: 'No hay copias disponibles de este libro. ¿Desea registrar una copia?',
            buttonText: {
              ok: 'Sí',
              cancel: 'No'
            }
          }
        });
  
        dialogRefStock.afterClosed().subscribe((result: boolean) => {
          
          if (selectedBook){
            selectedBook.stock += 1; 
          }             
          const book = selectedBook
          if (result && book) {
            // Aumentar en uno el stock del libro seleccionado
            this.bookService.updateBookStock(book).subscribe(() => {
              this.dialogRef.close(this.loanForm.value);
            });
          }
        }); 
        /* return;  */// Detener el proceso de guardar préstamo si no hay copias disponibles
      } else {
        const selectedBeneficiaryId = this.loanForm.value.beneficiaries_id;
        // Verificar si el beneficiario tiene préstamos pendientes de devolución
        this.loanService.checkLoans(selectedBeneficiaryId).subscribe(
          (hasPendingLoans: boolean) => {
            if (!hasPendingLoans) {
              // El beneficiario no tiene préstamos pendientes de devolución, continuar con la verificación de la suscripción
              this.subscriptionService
                .checkSubscriptionValidity(selectedBeneficiaryId)
                .subscribe(
                  (hasSubscription: boolean) => {
                    if (hasSubscription) {
                      
                      // Si el beneficiario tiene una suscripción vigente, cerrar el diálogo y guardar el préstamo
                      this.dialogRef.close(this.loanForm.value);
                    } else {
                      this.snackBar.open(
                        'El beneficiario seleccionado no tiene una suscripción vigente.',
                        'Cerrar',
                        {
                          duration: 4000,
                        }
                      );
                    }
                  },
                  (error) => {
                    console.error('Error al verificar la suscripción:', error);
                  }
                );
            } else {
              // El beneficiario tiene préstamos pendientes de devolución
              this.snackBar.open(
                'El beneficiario tiene libros pendientes de devolución.',
                'Cerrar',
                {
                  duration: 4000,
                }
              );
            }
          },
          (error) => {
            console.error(
              'Error al verificar préstamos pendientes de devolución:',
              error
            );
          }
        );
      }      
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
            this.snackBar.open(
              'El beneficiario seleccionado no tiene una suscripción vigente.',
              'Cerrar',
              {
                duration: 4000,
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar la suscripción:', error);
        }
      );
  }
  // Método para abrir el diálogo de agregar libro
  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '300px', // Define el ancho del diálogo como prefieras
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Agrega el nuevo libro a la lista de libros y selecciona automáticamente en el formulario
        this.books.push(result);
        this.loanForm.patchValue({
          books_id: result.id,
        });
      }
    });
  }
}
