import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogBookComponent } from './confirm-dialog-book.component';

describe('ConfirmDialogBookComponent', () => {
  let component: ConfirmDialogBookComponent;
  let fixture: ComponentFixture<ConfirmDialogBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogBookComponent]
    });
    fixture = TestBed.createComponent(ConfirmDialogBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
