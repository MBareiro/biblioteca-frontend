import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDialogComponent } from './stock-dialog.component';

describe('StockDialogComponent', () => {
  let component: StockDialogComponent;
  let fixture: ComponentFixture<StockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockDialogComponent]
    });
    fixture = TestBed.createComponent(StockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
