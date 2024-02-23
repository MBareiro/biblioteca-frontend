import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEditorialDialogComponent } from './edit-editorial-dialog.component';

describe('EditEditorialDialogComponent', () => {
  let component: EditEditorialDialogComponent;
  let fixture: ComponentFixture<EditEditorialDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEditorialDialogComponent]
    });
    fixture = TestBed.createComponent(EditEditorialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
