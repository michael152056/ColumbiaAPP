import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHorariosComponent } from './crud-horarios.component';

describe('CrudHorariosComponent', () => {
  let component: CrudHorariosComponent;
  let fixture: ComponentFixture<CrudHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
