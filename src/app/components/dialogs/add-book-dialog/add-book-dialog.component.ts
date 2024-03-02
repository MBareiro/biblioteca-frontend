import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditorialService } from 'src/app/services/editorial.service';
import { AuthorService } from 'src/app/services/author.service';
import { GenreService } from 'src/app/services/genre.service';
import { BooksService } from 'src/app/services/books.service';
import { Editorial } from 'src/app/models/editorial';
import { Author } from 'src/app/models/author';
import { Genre } from 'src/app/models/genre';
import { Observable } from 'rxjs';
import { AddAuthorDialogComponent } from '../add-author-dialog/add-author-dialog.component';
import { AddEditorialDialogComponent } from '../add-editorial-dialog/add-editorial-dialog.component';
import { AddGenreDialogComponent } from '../add-genre-dialog/add-genre-dialog.component';
import { ConfirmDialogBookComponent } from '../confirm-dialog-book/confirm-dialog-book.component'; 

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css'],
})
export class AddBookDialogComponent implements OnInit {
  bookData: any = {};
  editorials: Editorial[] = [];
  authors: Author[] = [];
  genres: Genre[] = [];
  bookTitles: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    private editorialService: EditorialService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private snackBar: MatSnackBar,
    private bookService: BooksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Cargar datos iniciales, como editoriales, autores, géneros, etc.
    this.editorialService.getEditorials().subscribe((editorials) => {
      this.editorials = editorials;
    });

    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.genreService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });

    this.bookService.getBookTitles().subscribe(
      (titles: string[]) => {
        this.bookTitles = titles;
      },
      (error) => {
        console.error('Error al obtener los títulos de los libros', error);
      }
    );
  }

  saveBook(): void {
    if (this.bookData.title && this.bookData.genre_id && this.bookData.author_id && this.bookData.editorial_id) {
      const bookData = this.bookData;
      // Realizar la búsqueda en la base de datos para verificar si el libro ya existe
      this.bookService.checkBookExists(bookData).subscribe(
        (response: any) => {
          const exists: boolean = response.exists;
          if (exists) {
            // Si el libro ya existe, mostrar el cuadro de diálogo de confirmación
            const dialogRef = this.dialog.open(ConfirmDialogBookComponent, {
              data: {
                message: '¡El libro ya existe! ¿Desea cargar/agregar copias nuevas o actualizar el stock del libro?',
                buttonText: {
                  ok: 'Sí',
                  cancel: 'No'
                }
              }
            });
  
            dialogRef.afterClosed().subscribe((result: boolean) => {
              if (result) {
                // Si el usuario selecciona "Sí", cierra el diálogo y guarda el nuevo libro
                this.dialogRef.close(bookData);
              }
            });
          } else {
            // Si el libro no existe, cerrar el diálogo y guardar el nuevo libro
            this.dialogRef.close(bookData);
          }
        },
        (error) => {
          console.error('Error al verificar si el libro existe:', error);
          // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
          this.snackBar.open('Error al verificar si el libro existe', 'Cerrar', {
            duration: 4000,
          });
        }
      );
    } else {
      // Mostrar un mensaje de error si algún campo obligatorio está vacío
      this.snackBar.open('¡Todos los campos son obligatorios!', 'Cerrar', {
        duration: 4000,
      });
    }
  }
  
  
  cancel(): void {
    this.dialogRef.close();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bookTitles.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  
  openAddEditorialDialog(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddEditorialDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.editorialService.addEditorial(result).subscribe(
          (createdEditorial: Editorial) => {
            this.snackBar.open('Editorial creada con éxito', 'Cerrar', {
              duration: 4000,
            });
            this.editorialService.getEditorials().subscribe((editorials) => {
              this.editorials = editorials;
              // Aquí debes asignar el valor directamente a bookData.editorialId
              this.bookData.editorial_id = createdEditorial.id;
            });
          },
          (error) => {
            console.error('Error al crear la editorial', error);
          }
        );
      }
    });
  }

  openAddGenreDialog(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddGenreDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.genreService.addGenre(result).subscribe(
          (createdGenre: Genre) => {
            this.snackBar.open('Género creado con éxito', 'Cerrar', {
              duration: 4000,
            });
            this.genreService.getGenres().subscribe((genres) => {
              this.genres = genres;
              // Aquí debes asignar el valor directamente a bookData.genreId
              this.bookData.genre_id = createdGenre.id;
            });
          },
          (error) => {
            console.error('Error al crear el género', error);
          }
        );
      }
    });
  }

  openAddAuthorDialog(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddAuthorDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authorService.addAuthor(result).subscribe(
          (createdAuthor: Author) => {
            this.snackBar.open('Autor creado con éxito', 'Cerrar', {
              duration: 4000,
            });
            this.authorService.getAuthors().subscribe((authors) => {
              this.authors = authors;
              // Aquí debes asignar el valor directamente a bookData.author_id
              this.bookData.author_id = createdAuthor.id;
            });
          },
          (error) => {
            console.error('Error al crear el autor', error);
          }
        );
      }
    });
  }


  // Método para filtrar caracteres no numéricos en el campo stock
  filterInput(event: any) {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^\d*$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
