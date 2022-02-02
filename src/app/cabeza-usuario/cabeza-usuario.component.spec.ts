import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabezaUsuarioComponent } from './cabeza-usuario.component';

describe('CabezaUsuarioComponent', () => {
  let component: CabezaUsuarioComponent;
  let fixture: ComponentFixture<CabezaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabezaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabezaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
