import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorDialogComponent } from './add-author-dialog.component';

describe('AddAuthorDialogComponent', () => {
  let component: AddAuthorDialogComponent;
  let fixture: ComponentFixture<AddAuthorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAuthorDialogComponent]
    });
    fixture = TestBed.createComponent(AddAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
