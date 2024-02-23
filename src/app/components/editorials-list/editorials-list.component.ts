import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Editorial } from 'src/app/models/editorial';
import { EditorialService } from 'src/app/services/editorial.service';
import { AddEditorialDialogComponent } from '../dialogs/add-editorial-dialog/add-editorial-dialog.component';
import { EditEditorialDialogComponent } from '../dialogs/edit-editorial-dialog/edit-editorial-dialog.component';

@Component({
  selector: 'app-editorials-list',
  templateUrl: './editorials-list.component.html',
  styleUrls: ['./editorials-list.component.css']
})
export class EditorialsListComponent {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Editorial>;
  dataSource: MatTableDataSource<Editorial> =
    new MatTableDataSource<Editorial>();
  displayedColumns: string[] = [
    'id',
    'name',
    'action'
  ];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private editorialService: EditorialService
  ) { }

  ngAfterViewInit(): void {
    this.loadEditorial();
  }

  loadEditorial(): void {
    this.editorialService.getEditorials().subscribe(
      (data: Editorial[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        // Forzar la detección de cambios después de la inicialización de la vista
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        console.error('Error al cargar editorials desde el backend:', error);
      }
    );
  }

  openAddEditorialDialog(): void {
    const dialogRef = this.dialog.open(AddEditorialDialogComponent, {
      width: '260px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí solo crearemos el editorial
        const editorialData = {
          name: result.name,
          last_name: result.last_name,
        };
  
        this.editorialService.addEditorial(editorialData).subscribe(
          (createdEditorial: Editorial) => {
            console.log('Editorial creado con éxito:', createdEditorial);
            this.loadEditorial();
          },
          error => {
            console.error('Error al crear el editorial:', error);
          }
        );
      }
    });
  }

  openEditEditorialDialog(genre: Editorial): void {
    const dialogRef = this.dialog.open(EditEditorialDialogComponent, {
      width: '260px',
      data: genre,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      // Si se proporciona un resultado, se editó el editorial.
      this.editorialService.updateEditorial(result).subscribe(
        () => {
          this.loadEditorial();
          // Edición exitosa, puedes realizar alguna acción adicional si es necesario
          console.log('Editorial editado con éxito');
        },
        (error) => {
          console.error('Error al editar editorial:', error);
        }
      );
      }
    });
  }

  deleteEditorial(id: number): void {
    this.editorialService.deleteEditorial(id).subscribe(
      () => {
        // Eliminación exitosa, actualizar la lista de editorials
        this.loadEditorial();
        console.log('Editorial eliminado con éxito');
      },
      (error) => {
        console.error('Error al eliminar editorial:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }









}
