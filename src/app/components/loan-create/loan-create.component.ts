import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan';
import { LoanService } from 'src/app/services/loan.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { BooksService } from 'src/app/services/books.service';
import { Beneficiary } from 'src/app/models/beneficiary';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent implements OnInit {
  loan: Loan = { id: 0, loan_date: new Date(), return_date: new Date(), returned: false, beneficiaries_id: 0, books_id: 0 };
  beneficiaries: Beneficiary[] = [];
  books: Book[] = [];
  availableBooks: Book[] = []; // Nuevo arreglo para almacenar libros disponibles

  @Output() addLoan = new EventEmitter<Loan>();
  @Output() cancelAddLoan = new EventEmitter<void>();

  constructor(
    private loanService: LoanService,
    private beneficiaryService: BeneficiariesService,
    private bookService: BooksService
  ) {}

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

  saveLoan(): void {
    this.loanService.createLoan(this.loan)
      .subscribe((newLoan: Loan) => {
        console.log('Préstamo registrado:', newLoan);
        this.addLoan.emit(newLoan);
      }, (error: any) => {
        console.error('Error al registrar préstamo:', error);
      });
  }

  cancel(): void {
    this.cancelAddLoan.emit();
  }
}
