import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Beneficiary } from 'src/app/models/beneficiary';
import { Book } from 'src/app/models/book';
import { Loan } from 'src/app/models/loan';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { BooksService } from 'src/app/services/books.service';
import { LoanService } from 'src/app/services/loan.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-add-loan-dialog',
  templateUrl: './add-loan-dialog.component.html',
  styleUrls: ['./add-loan-dialog.component.css']
})
export class AddLoanDialogComponent {
  loan: Loan = { id: 0, loan_date: new Date(), return_date: new Date(), returned: false, beneficiaries_id: 0, books_id: 0 };
  loanForm: FormGroup;
  beneficiaries: Beneficiary[] = [];
  books: Book[] = [];
  availableBooks: Book[] = []; 

  constructor(
    private dialogRef: MatDialogRef<AddLoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loanService: LoanService,
    private beneficiaryService: BeneficiariesService,
    private bookService: BooksService,
    private subscriptionService: SubscriptionsService
  ) {
    this.loanForm = this.fb.group({
      loan_date: ['', Validators.required], 
      return_date: ['', Validators.required], 
      returned: false, 
      beneficiaries_id: 0, 
      books_id: 0
      // Agrega más campos según tus necesidades
    });
  }

  ngOnInit(): void {
    this.loadBeneficiaries();
    this.loadBooks();
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe((data: Beneficiary[]) => {
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
    this.availableBooks = this.books.filter(book => book.available > 0);
  }

  save() {
    if (this.loanForm.valid) {
      const selectedBeneficiaryId = this.loanForm.value.beneficiaries_id;
      this.subscriptionService.checkSubscriptionValidity(selectedBeneficiaryId).subscribe(
        (hasSubscription: boolean) => {
          if (hasSubscription) {
            // Si el beneficiario tiene una suscripción vigente, cerrar el diálogo y guardar el préstamo
            this.dialogRef.close(this.loanForm.value);
          } else {
            // Si el beneficiario no tiene una suscripción vigente, mostrar un mensaje al usuario
            console.log('El beneficiario seleccionado no tiene una suscripción vigente.');
          }
        },
        (error) => {
          console.error('Error al verificar la suscripción:', error);
        }
      );
    } else {
      console.log("Formulario no válido");
    }
  }
  
  
  cancel() {
    this.dialogRef.close();
  }

  onBeneficiarySelectionChange(): void {
    const selectedBeneficiaryId = this.loanForm.value.beneficiaries_id;
    this.subscriptionService.checkSubscriptionValidity(selectedBeneficiaryId).subscribe(
      (hasSubscription: boolean) => {
        console.log(hasSubscription);
        
        if (!hasSubscription) {
          // Mostrar mensaje al usuario indicando que el beneficiario no tiene una suscripción vigente
          console.log('El beneficiario seleccionado no tiene una suscripción vigente.');
        }
      },
      (error) => {
        console.error('Error al verificar la suscripción:', error);
      }
    );
  }
}
