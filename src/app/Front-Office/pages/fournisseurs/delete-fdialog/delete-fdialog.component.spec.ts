import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFDialogComponent } from './delete-fdialog.component';

describe('DeleteFDialogComponent', () => {
  let component: DeleteFDialogComponent;
  let fixture: ComponentFixture<DeleteFDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
