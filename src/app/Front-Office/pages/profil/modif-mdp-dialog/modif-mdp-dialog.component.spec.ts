import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifMdpDialogComponent } from './modif-mdp-dialog.component';

describe('ModifMdpDialogComponent', () => {
  let component: ModifMdpDialogComponent;
  let fixture: ComponentFixture<ModifMdpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifMdpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMdpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
