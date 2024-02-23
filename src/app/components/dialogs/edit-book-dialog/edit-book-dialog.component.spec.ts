import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookDialogComponent } from './edit-book-dialog.component';

describe('EditBookDialogComponent', () => {
  let component: EditBookDialogComponent;
  let fixture: ComponentFixture<EditBookDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBookDialogComponent]
    });
    fixture = TestBed.createComponent(EditBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
