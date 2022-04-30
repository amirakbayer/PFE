import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifFDialogComponent } from './modif-fdialog.component';

describe('ModifFDialogComponent', () => {
  let component: ModifFDialogComponent;
  let fixture: ComponentFixture<ModifFDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifFDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifFDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
