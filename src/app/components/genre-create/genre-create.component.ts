import { Component, EventEmitter, Output } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent {
  genre: Genre = { id: 0, name: ''};

  @Output() addGenre = new EventEmitter<Genre>();
  @Output() cancelAddGenre = new EventEmitter<void>();

  constructor(private genreService: GenreService) {}

  saveGenre(): void {
    this.genreService.addGenre(this.genre)
      .subscribe((newGenre: Genre) => {
        console.log('Genero registrado:', newGenre);
        this.addGenre.emit(newGenre);
      }, (error: any) => {
        console.error('Error al registrar autor:', error);
      });
  }

  cancel(): void {
    this.cancelAddGenre.emit();
  }
}
