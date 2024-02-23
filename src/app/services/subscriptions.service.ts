import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from '../models/subcription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/subscription`, subscription);
  }

  getSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/subscriptions`);
  }

  // Agregar el método para obtener la suscripción por ID de usuario
  getSubscriptionByUserId(userId: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.baseUrl}/subscription/${userId}`);
  }

  renewSubscription(subscriptionId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/subscription/renew/${subscriptionId}`, {});
  }

  // Método para verificar la existencia de una suscripción por ID de usuario
  checkExistingSubscription(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/subscription/check/${userId}`);
  }

  // Método para verificar si la suscripción de un beneficiario está vigente
  checkSubscriptionValidity(beneficiaryId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/subscription/${beneficiaryId}/valid`);
  }

  // Método para actualizar una suscripción por ID
  updateSubscription(subscriptionId: number, updatedSubscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.baseUrl}/subscription/${subscriptionId}`, updatedSubscription);
  }

  deleteSubscription(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/subscription/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
  
}
