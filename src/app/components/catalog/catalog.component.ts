import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../../models/book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../dialogs/add-book-dialog/add-book-dialog.component';
import { EditBookDialogComponent } from '../dialogs/edit-book-dialog/edit-book-dialog.component';
import { BooksService } from 'src/app/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Book>;
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'id',
    'title',
    'editorialName',
    'authorName',
    'genreName',
    'stock',
    'available',
    'action',
  ];
  editorials: any;
  genres: any;
  authors: any;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private bookService: BooksService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        // Forzar la detección de cambios después de la inicialización de la vista
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        console.error('Error al cargar libros desde el backend:', error);
      }
    );
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '295px',
      data: {
        // Pasa opciones adicionales según sea necesario
        editorials: this.editorials,
        genres: this.genres,
        authors: this.authors,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Realizar la búsqueda en la base de datos para verificar si el libro ya existe
        this.bookService.checkBookExists(result).subscribe(
          (response: any) => {
            const exists: boolean = response.exists;
            if (exists) {
              // Agregar el ID del libro existente a los datos del libro
              result.id = response.id;

              // Actualizar el libro existente
              this.bookService.updateBookStock(result).subscribe(
                () => {
                  this.snackBar.open(
                    'Stock de libro actualizado con éxito',
                    'Cerrar',
                    {
                      duration: 4000,
                    }
                  );
                  this.loadBooks(); // Actualiza la lista de libros
                },
                (error) => {
                  console.error(
                    'Error al actualizar el stock del libro:',
                    error
                  );
                }
              );
            } else {
              // Si el libro no existe, crea un nuevo libro
              this.bookService.addBook(result).subscribe(
                (createdBook: Book) => {
                  this.snackBar.open('Libro creado con éxito', 'Cerrar', {
                    duration: 4000,
                  });
                  this.dataSource.data.push(createdBook);
                  this.dataSource._updateChangeSubscription();
                  this.loadBooks(); // Actualiza la lista de libros
                },
                (error) => {
                  console.error('Error al crear el libro:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error al verificar si el libro existe:', error);
            this.snackBar.open(
              'Error al verificar si el libro existe',
              'Cerrar',
              {
                duration: 4000,
              }
            );
          }
        );
      }
    });
  }

  openEditDialog(book: any): void {
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '245px',
      data: book,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para actualizar el libro en tu fuente de datos
        this.bookService.updateBook(result).subscribe(
          () => {
            this.loadBooks();
            // Edición exitosa, puedes realizar alguna acción adicional si es necesario
            this.snackBar.open('Libro actualizado correctamente', 'Cerrar', {
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(
      () => {
        // Eliminación exitosa, actualizar la lista de beneficiarios
        this.loadBooks();
        this.snackBar.open('Libro eliminado con éxito', 'Cerrar', {
          duration: 4000,
        });
      },
      (error) => {
        console.error('Error al eliminar beneficiario:', error);
      }
    );
  }
}
