import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialService } from 'src/app/services/editorial.service';
import { AuthorService } from 'src/app/services/author.service';
import { GenreService } from 'src/app/services/genre.service';
import { AddEditorialDialogComponent } from '../add-editorial-dialog/add-editorial-dialog.component';
import { Editorial } from 'src/app/models/editorial';
import { AddAuthorDialogComponent } from '../add-author-dialog/add-author-dialog.component';
import { Author } from 'src/app/models/author';
import { AddGenreDialogComponent } from '../add-genre-dialog/add-genre-dialog.component';
import { Genre } from 'src/app/models/genre';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

  addNewEditorial(event: Event): void {
    event.stopPropagation();
    // Lógica para agregar nueva editorial
  }
  
  addNewAuthor(event: Event): void {
    event.stopPropagation();
    // Lógica para agregar nuevo autor
  }
  
  addNewGenre(event: Event): void {
    event.stopPropagation();
    // Lógica para agregar nuevo género
  }
  
  bookForm!: FormGroup;
  editorials: any[] = [];
  authors: any[] = [];  // Agrega la propiedad authors
  genres: any[] = [];  // Agrega la propiedad genres

  constructor(
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    private formBuilder: FormBuilder, 
    private editorialService: EditorialService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      id: [''], // Assuming you want to allow manual entry for ID, otherwise exclude this line
      title: ['', Validators.required],
      stock: ['', Validators.required],
      available: ['', Validators.required],
      genreId: ['', Validators.required],
      authorId: ['', Validators.required],
      editorialId: ['', Validators.required],
    }); 

    // Llama a los servicios para obtener datos desde el backend
    this.editorialService.getEditorials().subscribe(editorials => {
      this.editorials = editorials;
    });

    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });

    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
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
            // La creación fue exitosa, puedes hacer lo que necesites con la nueva editorial
            this.snackBar.open('Editorial creada con éxito', 'Cerrar', {
              duration: 4000
            });
            this.editorialService.getEditorials().subscribe(editorials => {
              this.editorials = editorials;
              
              // Establecer el valor del formulario para la nueva editorial
              this.bookForm.patchValue({
                editorialId: createdEditorial.id
              });
            });
          },
          error => {
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
            // La creación fue exitosa, puedes hacer lo que necesites con el nuevo género
            this.snackBar.open('Género creado con éxito', 'Cerrar', {
              duration: 4000
            });
            this.genreService.getGenres().subscribe(genres => {
              this.genres = genres;
              
              // Establecer el valor del formulario para el nuevo género
              this.bookForm.patchValue({
                genreId: createdGenre.id
              });
            });
          },
          error => {
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
            // La creación fue exitosa, puedes hacer lo que necesites con el nuevo autor
            this.snackBar.open('Autor creado con éxito', 'Cerrar', {
              duration: 4000
            });
            this.authorService.getAuthors().subscribe(authors => {
              this.authors = authors;
              
              // Establecer el valor del formulario para el nuevo autor
              this.bookForm.patchValue({
                authorId: createdAuthor.id
              });
            });
          },
          error => {
            console.error('Error al crear el autor', error);
          }
        );
  
        
      }
    });
  }
  

  

  mostrarSnackbar(
    mensaje: string,
    panelClass: string[] = [],
    duration: number = 5000
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: panelClass,
    };
    this.snackBar.open(mensaje, 'Cerrar', config);
  }
}
