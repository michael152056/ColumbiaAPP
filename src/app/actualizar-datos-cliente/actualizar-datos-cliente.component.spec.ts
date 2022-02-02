import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDatosClienteComponent } from './actualizar-datos-cliente.component';

describe('ActualizarDatosClienteComponent', () => {
  let component: ActualizarDatosClienteComponent;
  let fixture: ComponentFixture<ActualizarDatosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDatosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
