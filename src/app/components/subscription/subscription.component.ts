import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from '../../models/subcription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { RenewSubscriptionDialogComponent } from '../dialogs/renew-subscription-dialog/renew-subscription-dialog.component';
import { SubscriptionNotificationService } from 'src/app/services/subscription-notification.service';
import { AddSubscriptionDialogComponent } from '../dialogs/add-subscription-dialog/add-subscription-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Subscription>;
  dataSource: MatTableDataSource<Subscription> =
    new MatTableDataSource<Subscription>();
  displayedColumns: string[] = [
    'id',
    'name',
    'start_date',
    'end_date',
    'state',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private subscriptionService: SubscriptionsService,
    private subscriptionNotificationService: SubscriptionNotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (data: Subscription[]) => {
        console.log(data);
        
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      (error) => {
        console.error('Error al cargar suscripciones desde el backend:', error);
      }
    );
  }

  // Función para determinar el estado de la suscripción (Vigente o Vencido)
  getSubscriptionState(subscription: Subscription): string {
    const currentDate = new Date();
    const endDate = new Date(subscription.end_date);
    return endDate >= currentDate ? 'Vigente' : 'Vencido';
  }

  openAddSubscriptionDialog(): void {
    // Paso 3: Lógica para abrir el diálogo de agregar suscripción
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent, {
      width: '260px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo de agregar suscripción se cerró');
      if (result) {
        this.loadSubscriptions(); 
        // Aquí puedes realizar cualquier acción después de cerrar el diálogo, si es necesario
      }
    });
  }

  openEditSubscriptionDialog(subscription: Subscription): void {
    // Lógica para abrir el diálogo de edición de suscripción
    console.log('Abrir diálogo de edición de suscripción');
  }

  deleteSubscription(id: number): void {
    console.log("SIIII");
    
    this.subscriptionService.deleteSubscription(id).subscribe(
      () => {
        // Eliminación exitosa, actualizar la lista de beneficiarios
        this.loadSubscriptions();
        this.snackBar.open('Suscripcion eliminada', 'Cerrar', {
          duration: 4000
        });
      },
      (error) => {
        console.error('Error al eliminar beneficiario:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openRenewSubscriptionDialog(subscription: Subscription): void {
    if (!subscription || typeof subscription.id_user !== 'number') {
      console.error('Suscripción inválida:', subscription);
      return;
    }
    console.log(subscription);
    
    const dialogRef = this.dialog.open(RenewSubscriptionDialogComponent, {
      width: '260px',
      data: { subscription: subscription }, // Pasar el objeto de suscripción completo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo de renovación se cerró');
      if (result) {
        console.log(result);

        const updatedSubscription: Subscription = result;
        const id_subscription = updatedSubscription.id;
        if (id_subscription) {
          this.subscriptionService
            .updateSubscription(id_subscription, updatedSubscription)
            .subscribe(
              (updatedSubscription) => {
                console.log('Suscripción actualizada:', updatedSubscription);
                this.loadSubscriptions();
              },
              (error) => {
                console.error('Error al actualizar la suscripción:', error);
              }
            );
        }
      }
    });
  }

  getBackgroundColor(subscription: Subscription): string {
    return this.getSubscriptionState(subscription) === 'Vigente'
      ? 'green'
      : 'red';
  }
}
