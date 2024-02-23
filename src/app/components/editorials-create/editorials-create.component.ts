import { Component, EventEmitter, Output } from '@angular/core';
import { Editorial } from 'src/app/models/editorial';
import { EditorialService } from 'src/app/services/editorial.service';

@Component({
  selector: 'app-editorials-create',
  templateUrl: './editorials-create.component.html',
  styleUrls: ['./editorials-create.component.css']
})
export class EditorialsCreateComponent {
  editorial: Editorial = { id: 0, name: ''};

  @Output() addEditorial = new EventEmitter<Editorial>();
  @Output() cancelAddEditorial = new EventEmitter<void>();

  constructor(private editorialService: EditorialService) {}

  saveEditorial(): void {
    this.editorialService.addEditorial(this.editorial)
      .subscribe((newEditorial: Editorial) => {
        console.log('Editorial registrada:', newEditorial);
        this.addEditorial.emit(newEditorial);
      }, (error: any) => {
        console.error('Error al registrar editorial:', error);
      });
  }

  cancel(): void {
    this.cancelAddEditorial.emit();
  }
}
