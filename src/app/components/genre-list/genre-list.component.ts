import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { Genre } from 'src/app/models/genre';
import { BooksService } from 'src/app/services/books.service';
import { GenreService } from 'src/app/services/genre.service';
import { AddGenreDialogComponent } from '../dialogs/add-genre-dialog/add-genre-dialog.component';
import { EditGenreDialogComponent } from '../dialogs/edit-genre-dialog/edit-genre-dialog.component';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css'],
})
export class GenreListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Genre>;
  dataSource: MatTableDataSource<Genre> = new MatTableDataSource<Genre>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private genreService: GenreService,
    private snackBar: MatSnackBar,
    private bookService: BooksService
  ) {}

  ngAfterViewInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(
      (data: Genre[]) => {
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

  openAddGenreDialog(): void {
    const dialogRef = this.dialog.open(AddGenreDialogComponent, {
      width: '260px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);

        // Aquí solo crearemos el beneficiario
        const beneficiaryData = {
          name: result.name,
        };

        this.genreService.addGenre(beneficiaryData).subscribe(
          (createdGenre: Genre) => {
            this.snackBar.open('Genero creado con éxito', 'Cerrar', {
              duration: 4000,
            });
            this.loadGenres();
          },
          (error) => {
            console.error('Error al crear el genero:', error);
          }
        );
      }
    });
  }

  openEditGenreDialog(genre: Genre): void {
    const dialogRef = this.dialog.open(EditGenreDialogComponent, {
      width: '260px',
      data: genre,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si se proporciona un resultado, se editó el beneficiario.
        this.genreService.updateGenre(result).subscribe(
          () => {
            this.loadGenres();
            // Edición exitosa, puedes realizar alguna acción adicional si es necesario
            this.snackBar.open('Genero editado con exito', 'Cerrar', {
              duration: 4000,
            });
          },
          (error) => {
            console.error('Error al editar beneficiario:', error);
          }
        );
      }
    });
  }

  deleteGenre(id: number): void {
    // Primero, verifica si el autor tiene libros asociados
    this.bookService.getBooksByGenreId(id).subscribe(
      (books: Book[]) => {
        if (books.length > 0) {
          // Si hay libros asociados, muestra un mensaje al usuario
          console.log(
            'No se puede eliminar este genero porque tiene libros asociados.'
          );
          this.snackBar.open(
            'No se puede eliminar este genero porque tiene libros asociados.',
            'Cerrar',
            {
              duration: 4000,
            }
          );
        } else {
          // Si no hay libros asociados, procede con la eliminación del autor
          this.genreService.deleteGenre(id).subscribe(
            () => {
              // Eliminación exitosa, actualizar la lista de autores
              this.loadGenres();
              this.snackBar.open('Genero eliminado con éxito', 'Cerrar', {
                duration: 4000,
              });
            },
            (error) => {
              console.error('Error al eliminar autor:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener los libros del autor:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
