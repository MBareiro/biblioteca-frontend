import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  beneficiaryForm: FormGroup;
  suscriptionForm: FormGroup;
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  subscription: Subscription = {
    start_date: new Date().toISOString(),
    end_date: '',
    id_user: 0,
  };
  duration: number = 0; // Valor predeterminado de duración en meses

  minDate: Date;

  @Output() addSubscription: EventEmitter<Subscription> =
    new EventEmitter<Subscription>();

  constructor(
    private beneficiaryService: BeneficiariesService,
    private subscriptionService: SubscriptionsService,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {

    this.beneficiaryForm = this._formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthdate: ['', Validators.required],
    });

    this.suscriptionForm = this._formBuilder.group({
      duration: ['', Validators.required]
    });

    const currentDay = new Date(); // Obtiene la fecha actual
    this.minDate = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate()
    );
  }

  ngOnInit(): void { }

  saveSubscription(): void {
    const beneficiaryData = this.beneficiaryForm.value;
    this.beneficiaryService.addBeneficiary(beneficiaryData).subscribe(
      (createdBeneficiary: Beneficiary) => {
        console.log('Beneficiario creado:', createdBeneficiary);
        this.snackBar.open('Beneficiario creado con éxito', 'Cerrar', {
          duration: 4000
        });
  
        // Obtener el ID del beneficiario recién creado
        const beneficiaryId = createdBeneficiary.id;
  
        // Verificar si el ID del beneficiario es válido antes de asignarlo
        if (beneficiaryId !== undefined) {
          console.log("Entra");
          
          // Asignar el ID del beneficiario a la suscripción
          this.subscription.id_user = beneficiaryId;
          this.calculateEndDate()
          // Continuar con la creación de la suscripción
          this.createSubscription();
          // Limpiar el formulario de beneficiario
          this.beneficiaryForm.reset();
        } else {
          console.error('El ID del beneficiario es indefinido');
        }
      },
      error => {
        console.error('Error al crear el beneficiario:', error);
      }
    );
  }
  
  
  createSubscription(): void {
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
    const suscriptionForm = this.suscriptionForm.value;
    if (this.subscription.start_date && this.subscription.id_user) {
      const startDate = new Date(this.subscription.start_date);
      const endDate = new Date(
        startDate.setMonth(startDate.getMonth() + suscriptionForm.duration)
      );
      this.subscription.end_date = endDate.toISOString();      
    }
  }
}
