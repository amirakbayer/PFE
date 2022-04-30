import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifNumDialogComponent } from './modif-num-dialog.component';

describe('ModifNumDialogComponent', () => {
  let component: ModifNumDialogComponent;
  let fixture: ComponentFixture<ModifNumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifNumDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifNumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
