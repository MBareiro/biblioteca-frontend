// subscription-notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from '../models/subcription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionNotificationService {
  private subscriptionAddedSource = new Subject<Subscription>();

  subscriptionAdded$ = this.subscriptionAddedSource.asObservable();

  constructor() { }

  notifySubscriptionAdded(subscription: Subscription) {
    this.subscriptionAddedSource.next(subscription);
  }
}