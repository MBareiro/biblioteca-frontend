import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from 'src/app/services/loan.service';
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
    private loanService: LoanService,
    @Inject(MAT_DIALOG_DATA) public data: { subscription: Subscription }
  ) { 
    // Obtener la fecha de vencimiento del objeto de suscripción proporcionado
    this.endDate = new Date(data.subscription.end_date);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  renew(): void {
    // Verificar si el ID del beneficiario está definido
    if (this.data.subscription.id_user) {
      console.log("entro");
      
      // Antes de renovar, verificar si el beneficiario tiene libros pendientes
      this.loanService.checkLoans(this.data.subscription.id_user).subscribe(hasBooksPending => {

        if (hasBooksPending) {
          // Si tiene libros pendientes, mostrar un mensaje de error
          alert('El beneficiario tiene libros pendientes por devolver. No se puede renovar la suscripción.');
        } else {
          // Si no tiene libros pendientes, proceder con la renovación de la suscripción
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
      });
    } else {
      console.error('ID del beneficiario no definido');
    }
  }
}
