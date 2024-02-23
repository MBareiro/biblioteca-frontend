import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreateComponent } from './subscription-create.component';

describe('SubscriptionCreateComponent', () => {
  let component: SubscriptionCreateComponent;
  let fixture: ComponentFixture<SubscriptionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionCreateComponent]
    });
    fixture = TestBed.createComponent(SubscriptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
