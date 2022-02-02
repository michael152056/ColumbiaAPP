import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarEventosComponent } from './calificar-eventos.component';

describe('CalificarEventosComponent', () => {
  let component: CalificarEventosComponent;
  let fixture: ComponentFixture<CalificarEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificarEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
