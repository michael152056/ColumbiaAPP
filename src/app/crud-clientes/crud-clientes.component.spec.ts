import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudClientesComponent } from './crud-clientes.component';

describe('CrudClientesComponent', () => {
  let component: CrudClientesComponent;
  let fixture: ComponentFixture<CrudClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
