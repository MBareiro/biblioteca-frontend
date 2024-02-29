import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { AddAuthorDialogComponent } from '../dialogs/add-author-dialog/add-author-dialog.component';
import { EditAuthorDialogComponent } from '../dialogs/edit-author-dialog/edit-author-dialog.component';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Author>;
  dataSource: MatTableDataSource<Author> =
    new MatTableDataSource<Author>();
  displayedColumns: string[] = [
    'id',
    'name',/* 
    'last_name', */
    'action'
  ];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private authorService: AuthorService,
    private bookService: BooksService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (data: Author[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;

        // Forzar la detección de cambios después de la inicialización de la vista
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        console.error('Error al cargar autores desde el backend:', error);
      }
    );
  }

  openAddAuthorDialog(): void {
    
    const dialogRef = this.dialog.open(AddAuthorDialogComponent, {
      width: '260px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        // Aquí solo crearemos el autor
        const authorData = {
          name: result.name,
          last_name: result.last_name,
        };
  
        this.authorService.addAuthor(authorData).subscribe(
          (createdAuthor: Author) => {
            console.log('Autor creado con éxito:', createdAuthor);
            this.loadAuthors();
          },
          error => {
            console.error('Error al crear el autor:', error);
          }
        );
      }
    });
  }

  openEditAuthorDialog(author: Author): void {
    const dialogRef = this.dialog.open(EditAuthorDialogComponent, {
      width: '260px',
      data: author,
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      // Si se proporciona un resultado, se editó el autor.
      this.authorService.updateAuthor(result).subscribe(
        () => {
          this.loadAuthors();
          // Edición exitosa, puedes realizar alguna acción adicional si es necesario
          console.log('Autor editado con éxito');
          this.snackBar.open('Autor editado con éxito.', 'Cerrar', {
            duration: 4000,
          });
        },
        (error) => {
          console.error('Error al editar autor:', error);
        }
      );
      }
      
    });
  }

  deleteAuthor(id: number): void {
    // Primero, verifica si el autor tiene libros asociados
    this.bookService.getBooksByAuthorId(id).subscribe(
      (books: Book[]) => {
        if (books.length > 0) {
          // Si hay libros asociados, muestra un mensaje al usuario
          console.log('No se puede eliminar este autor porque tiene libros asociados.');
          this.snackBar.open('No se puede eliminar este autor porque tiene libros asociados.', 'Cerrar', {
            duration: 4000,
          });
        } else {
          // Si no hay libros asociados, procede con la eliminación del autor
          this.authorService.deleteAuthor(id).subscribe(
            () => {
              // Eliminación exitosa, actualizar la lista de autores
              this.loadAuthors();
              console.log('Autor eliminado con éxito');
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

  
  

