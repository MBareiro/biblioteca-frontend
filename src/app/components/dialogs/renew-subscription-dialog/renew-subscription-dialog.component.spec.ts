import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewSubscriptionDialogComponent } from './renew-subscription-dialog.component';

describe('RenewSubscriptionDialogComponent', () => {
  let component: RenewSubscriptionDialogComponent;
  let fixture: ComponentFixture<RenewSubscriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenewSubscriptionDialogComponent]
    });
    fixture = TestBed.createComponent(RenewSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
