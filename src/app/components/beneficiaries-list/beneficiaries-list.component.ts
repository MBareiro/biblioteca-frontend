import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'src/app/models/subcription';
import { LoanService } from 'src/app/services/loan.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Beneficiary } from '../../models/beneficiary';
import { BeneficiariesService } from '../../services/beneficiaries.service';
import { AddBeneficiaryDialogComponent } from '../dialogs/add-beneficiary-dialog/add-beneficiary-dialog.component';
import { EditBeneficiaryDialogComponent } from '../dialogs/edit-beneficiary-dialog/edit-beneficiary-dialog.component';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.css'],
})
export class BeneficiariesListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Beneficiary>;
  dataSource: MatTableDataSource<Beneficiary> =
    new MatTableDataSource<Beneficiary>();
  displayedColumns: string[] = [
    'id',
    'name',
    'last_name',
    'phone',
    'action',
  ];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private beneficiaryService: BeneficiariesService,
    private subscriptionService: SubscriptionsService,
    private loanService: LoanService,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.loadBeneficiaries();
  }



  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe(
      (data: Beneficiary[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        // Forzar la detección de cambios después de la inicialización de la vista
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        console.error('Error al cargar beneficiarios desde el backend:', error);
      }
    );
  }

  openAddBeneficiaryDialog(): void {
    const dialogRef = this.dialog.open(AddBeneficiaryDialogComponent, {
      width: '260px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí solo crearemos el beneficiario
        const beneficiaryData = {
          name: result.name,
          last_name: result.last_name,
          phone: result.phone
        };

        this.beneficiaryService.addBeneficiary(beneficiaryData).subscribe(
          (createdBeneficiary: Beneficiary) => {
            this.snackBar.open('Beneficiario creado con exito', 'Cerrar', {
              duration: 4000
            });
            this.loadBeneficiaries();
          },
          error => {
            console.error('Error al crear el beneficiario:', error);
          }
        );
      }
    });
  }

  openEditBeneficiaryDialog(beneficiary: Beneficiary): void {
    const dialogRef = this.dialog.open(EditBeneficiaryDialogComponent, {
      width: '260px',
      data: beneficiary,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si se proporciona un resultado, se editó el beneficiario.
        this.beneficiaryService.updateBeneficiary(result).subscribe(
          () => {
            this.loadBeneficiaries();
            // Edición exitosa, puedes realizar alguna acción adicional si es necesario
            this.snackBar.open('Beneficiario editado con exito', 'Cerrar', {
              duration: 4000
            });
          },
          (error) => {
            console.error('Error al editar beneficiario:', error);
          }
        );
      }
    });
  }

  deleteBeneficiary(id: number): void {
    this.beneficiaryService.deleteBeneficiary(id).subscribe(
      () => {
        // Eliminación exitosa, actualizar la lista de beneficiarios
        this.loadBeneficiaries();
        this.snackBar.open('Beneficiario editado con exito', 'Cerrar', {
          duration: 4000
        });
      },
      (error) => {
        console.error('Error al eliminar beneficiario:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
