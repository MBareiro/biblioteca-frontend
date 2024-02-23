import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Beneficiary } from 'src/app/models/beneficiary';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { SubscriptionNotificationService } from 'src/app/services/subscription-notification.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Subscription } from '../../models/subcription';

@Component({
  selector: 'app-subscription-create',
  templateUrl: './subscription-create.component.html',
  styleUrls: ['./subscription-create.component.css'],
})
export class SubscriptionCreateComponent {
  beneficiaries: Beneficiary[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  subscription: Subscription = {
    start_date: new Date().toISOString(),
    end_date: '',
    id_user: 0,
  };
  duration: number = 0; // Valor predeterminado de duración en meses

  @Output() addSubscription: EventEmitter<Subscription> =
    new EventEmitter<Subscription>();

  constructor(
    private beneficiaryService: BeneficiariesService,
    private subscriptionService: SubscriptionsService,
    private subscriptionNotificationService: SubscriptionNotificationService,
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
          } else {
            // Si no existe, guardar la nueva suscripción
            this.subscriptionService
              .addSubscription(this.subscription)
              .subscribe(
                (newSubscription: Subscription) => {
                  console.log('Suscripción registrada:', newSubscription);
                  this.addSubscription.emit(newSubscription);
                  this.snackBar.open(
                    'Suscripción registrada!',
                    'Cerrar',
                    {
                      duration: 4000,
                    }
                  );
                  // Limpiar el formulario
                  this.subscription = {
                    start_date: new Date().toISOString(),
                    end_date: '',
                    id_user: 0,
                  };
                  this.duration = 0;
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
}
