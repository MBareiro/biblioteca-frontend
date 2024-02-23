// loan-list.component.ts
import { ChangeDetectorRef, Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Loan } from 'src/app/models/loan';
import { BooksService } from 'src/app/services/books.service';
import { LoanService } from 'src/app/services/loan.service';
import { AddLoanDialogComponent } from '../dialogs/add-loan-dialog/add-loan-dialog.component';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Loan>;
  dataSource: MatTableDataSource<Loan> = new MatTableDataSource<Loan>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id', 'loan_date', 'return_date', 'returned', 'beneficiaryName', 'bookTitle', 'action'];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private loanService: LoanService,   
    private bookService: BooksService, 
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe(
     
      
      (loans: Loan[]) => {
        this.dataSource.data = loans;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        console.error('Error al cargar los préstamos:', error);
      }
    );
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  openEditLoanDialog(loan: any): void {
    // Lógica para abrir el diálogo de edición según tus necesidades
    console.log('Abrir diálogo de edición para el préstamo:', loan);
  }

  deleteLoan(id: number): void {
    this.loanService.deleteLoan(id).subscribe(
      () => {
        // Eliminación exitosa, actualizar la lista de beneficiarios
        this.loadLoans();
        this.snackBar.open('Prestamo eliminado con éxito', 'Cerrar', {
          duration: 4000
        });
      },
      (error) => {
        console.error('Error al eliminar prestamo:', error);
      }
    );
  }

  cancelLoan(id: number): void {
    this.loanService.cancelLoan(id).subscribe(
      () => {
        this.loadLoans();
        this.snackBar.open('Prestamo concluido con éxito', 'Cerrar', {
          duration: 4000
        });
      },
      (error) => {
        console.error('Error al cancelar préstamo:', error);
      }
    );
  }

  openAddLoanDialog(): void {
    const dialogRef = this.dialog.open(AddLoanDialogComponent, {
      width: '300px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.createLoan(result).subscribe(
          (createdLoan: Loan) => {
            // La creación fue exitosa, puedes hacer lo que necesites con el nuevo libro
            this.snackBar.open('Prestamo creado con éxito', 'Cerrar', {
              duration: 4000
            });
            this.dataSource.data.push(createdLoan);
            this.dataSource._updateChangeSubscription();
            this.loadLoans();
          },
          error => {
            console.error('Error al crear el Loan:', error);
          }
        );
      }
    });
  }
  getBackgroundColor(returned: boolean): string {
    return returned ? 'green' : 'red';
  }
  
  
}
