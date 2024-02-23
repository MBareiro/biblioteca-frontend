import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Beneficiary } from 'src/app/models/beneficiary';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { Subscription } from '../../../models/subcription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-add-subscription-dialog',
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.css'],
})
export class AddSubscriptionDialogComponent {
  beneficiaries: Beneficiary[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Definición de months
  subscription: Subscription = {
    start_date: new Date().toISOString(),
    end_date: '',
    id_user: 0,
  };
  duration: number = 0; // Valor predeterminado de duración en meses

  constructor(
    public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>, // Modificar aquí para que sea pública
    private beneficiaryService: BeneficiariesService,
    private subscriptionService: SubscriptionsService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getBeneficiaries().subscribe(
      (data: Beneficiary[]) => {
        this.beneficiaries = data;
      },
      (error) => {
        console.error('Error al cargar beneficiarios:', error);
      }
    );
  }

  saveSubscription(): void {
    if (!this.subscription.id_user || !this.subscription.end_date) {
      console.error('Todos los campos deben estar completos');
      return;
    }

    // Verificar si ya existe una suscripción para el usuario seleccionado
    this.subscriptionService
      .checkExistingSubscription(this.subscription.id_user)
      .subscribe(
        (exists: boolean) => {
          if (exists) {
            console.error('Ya existe una suscripción para este usuario');
            this.snackBar.open('Ya existe una suscripción para este usuario', 'Cerrar', {
              duration: 4000
            });
          } else {
            // Si no existe, guardar la nueva suscripción
            this.subscriptionService
              .addSubscription(this.subscription)
              .subscribe(
                (newSubscription: Subscription) => {
                  console.log('Suscripción registrada:', newSubscription);
                  this.snackBar.open(
                    'Suscripción registrada!',
                    'Cerrar',
                    {
                      duration: 4000,
                    }
                  );
                  // Cerrar el diálogo y pasar la nueva suscripción como resultado
                  this.dialogRef.close(newSubscription);
                },
                (error) => {
                  console.error('Error al registrar suscripción:', error);
                }
              );
          }
        },
        (error) => {
          // Si hay algún error, lo manejamos aquí
          console.error('Error al verificar suscripción existente:', error);
        }
      );
  }

  calculateEndDate(): void {
    if (this.subscription.start_date && this.subscription.id_user) {
      const startDate = new Date(this.subscription.start_date);
      const endDate = new Date(
        startDate.setMonth(startDate.getMonth() + this.duration)
      );
      this.subscription.end_date = endDate.toISOString();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
