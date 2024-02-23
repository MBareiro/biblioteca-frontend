// authors-create.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors-create',
  templateUrl: './authors-create.component.html',
  styleUrls: ['./authors-create.component.css']
})
export class AuthorsCreateComponent {
  author: Author = { id: 0, name: '', last_name: ''};

  @Output() addAuthor = new EventEmitter<Author>();
  @Output() cancelAddAuthor = new EventEmitter<void>();

  constructor(private authorsService: AuthorService) {}

  saveAuthor(): void {
    this.authorsService.addAuthor(this.author)
      .subscribe((newAuthor: Author) => {
        console.log('Autor registrado:', newAuthor);
        this.addAuthor.emit(newAuthor);
      }, (error: any) => {
        console.error('Error al registrar autor:', error);
      });
  }

  cancel(): void {
    this.cancelAddAuthor.emit();
  }
}
