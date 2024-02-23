import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from '../../../models/subcription';

@Component({
  selector: 'app-renew-subscription-dialog',
  templateUrl: './renew-subscription-dialog.component.html',
})
export class RenewSubscriptionDialogComponent {

  months: number[] = [1, 3, 6, 12]; // Opciones de meses para renovación
  selectedMonths: number = 1; // Mes seleccionado por defecto
  currentDate: Date = new Date(); // Fecha actual
  endDate: Date; // Fecha de vencimiento

  constructor(
    public dialogRef: MatDialogRef<RenewSubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subscription: Subscription }
  ) { 
    // Obtener la fecha de vencimiento del objeto de suscripción proporcionado
    this.endDate = new Date(data.subscription.end_date);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  renew(): void {
    // Lógica para calcular la nueva fecha de vencimiento
    let newEndDate: Date;
    const selectedMonths = this.selectedMonths;

    // Calcular la nueva fecha de vencimiento sumando los meses seleccionados
    newEndDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() + selectedMonths, this.endDate.getDate());

    // Crear un nuevo objeto de suscripción con los datos actualizados
    const updatedSubscription: Subscription = {
      ...this.data.subscription,
      end_date: newEndDate.toISOString()
    };

    // Cerrar el diálogo y pasar el objeto de suscripción completo con los datos actualizados al componente padre
    this.dialogRef.close(updatedSubscription);
  }
}
