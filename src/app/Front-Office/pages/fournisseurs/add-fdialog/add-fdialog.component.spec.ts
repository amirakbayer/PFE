import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFDialogComponent } from './add-fdialog.component';

describe('AddFDialogComponent', () => {
  let component: AddFDialogComponent;
  let fixture: ComponentFixture<AddFDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
