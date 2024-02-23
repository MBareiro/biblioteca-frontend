import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionDialogComponent } from './add-subscription-dialog.component';

describe('AddSubscriptionDialogComponent', () => {
  let component: AddSubscriptionDialogComponent;
  let fixture: ComponentFixture<AddSubscriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubscriptionDialogComponent]
    });
    fixture = TestBed.createComponent(AddSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
