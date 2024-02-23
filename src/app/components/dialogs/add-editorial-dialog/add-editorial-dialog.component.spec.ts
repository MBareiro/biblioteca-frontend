import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditorialDialogComponent } from './add-editorial-dialog.component';

describe('AddEditorialDialogComponent', () => {
  let component: AddEditorialDialogComponent;
  let fixture: ComponentFixture<AddEditorialDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditorialDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditorialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
