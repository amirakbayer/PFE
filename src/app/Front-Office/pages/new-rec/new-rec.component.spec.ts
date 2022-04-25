import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecComponent } from './new-rec.component';

describe('NewRecComponent', () => {
  let component: NewRecComponent;
  let fixture: ComponentFixture<NewRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
