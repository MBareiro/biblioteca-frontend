import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialsCreateComponent } from './editorials-create.component';

describe('EditorialsCreateComponent', () => {
  let component: EditorialsCreateComponent;
  let fixture: ComponentFixture<EditorialsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorialsCreateComponent]
    });
    fixture = TestBed.createComponent(EditorialsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
