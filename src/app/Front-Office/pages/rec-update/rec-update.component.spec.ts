import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecUpdateComponent } from './rec-update.component';

describe('RecUpdateComponent', () => {
  let component: RecUpdateComponent;
  let fixture: ComponentFixture<RecUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
