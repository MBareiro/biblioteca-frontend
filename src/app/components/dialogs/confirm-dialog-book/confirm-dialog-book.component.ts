import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-book',
  templateUrl: './confirm-dialog-book.component.html',
})
export class ConfirmDialogBookComponent {
  message: string;
  buttonText: { ok: string, cancel: string };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.buttonText = data.buttonText;
  }
}
