import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { GenreService } from 'src/app/services/genre.service';
import { AuthorService } from 'src/app/services/author.service';
import { EditorialService } from 'src/app/services/editorial.service';
import { Book } from 'src/app/models/book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css']
})
export class EditBookDialogComponent implements OnInit {
  bookForm: FormGroup;
  editorials: any[] = [];
  authors: any[] = [];
  genres: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private authorService: AuthorService,
    private editorialService: EditorialService,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.formBuilder.group({
      title: [data.title, Validators.required],
      author_id: [data.author, Validators.required],
      genre_id: [data.genre, Validators.required],
      editorial_id: [data.editorial, Validators.required],
      stock: [data.stock, Validators.required],      /* 
      available: [data.available, Validators.required]  */
    });
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: [this.capitalizeFirstLetter(this.data.title), Validators.required],
      author_id: [this.data.author, Validators.required],
      genre_id: [this.data.genre, Validators.required],
      editorial_id: [this.data.editorial, Validators.required],
      stock: [this.data.stock, Validators.required],/* 
      available: [this.data.available, Validators.required] */
    });

    this.loadMetadata();
  }

  loadMetadata(): void {
    this.editorialService.getEditorials().subscribe(data => {
      this.editorials = data;

      // Buscar el autor correspondiente en la lista
      const selectedEditorial = this.editorials.find(editorial => editorial.id === this.data.editorials_id);
      // Establecer el autor encontrado como seleccionado en el formulario
      if (selectedEditorial) {
        this.bookForm.patchValue({ editorial_id: selectedEditorial.id });
      }
    });

    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;

      // Buscar el autor correspondiente en la lista
      const selectedAuthor = this.authors.find(author => author.id === this.data.authors_id);
      // Establecer el autor encontrado como seleccionado en el formulario
      if (selectedAuthor) {
        this.bookForm.patchValue({ author_id: selectedAuthor.id });
      }
    });

    this.genreService.getGenres().subscribe(data => {
      this.genres = data;
      // Buscar el autor correspondiente en la lista
      const selectedGenre = this.genres.find(genre => genre.id === this.data.genres_id);
      // Establecer el autor encontrado como seleccionado en el formulario
      if (selectedGenre) {
        this.bookForm.patchValue({ genre_id: selectedGenre.id });
      }
    });
  }

  saveBook(): void {
    console.log("asd");
    
    if (this.bookForm.valid) {
      const updatedbook: Book = {
        ...this.data,
        ...this.bookForm.value
      };
      this.dialogRef.close(updatedbook);
    } else {
      this.snackBar.open('Complete todos los campos', 'Cerrar', {
        duration: 4000
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
