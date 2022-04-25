import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecDetailsComponent } from './rec-details.component';

describe('RecDetailsComponent', () => {
  let component: RecDetailsComponent;
  let fixture: ComponentFixture<RecDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
