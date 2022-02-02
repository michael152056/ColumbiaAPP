import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEventosComponent } from './crud-eventos.component';

describe('CrudEventosComponent', () => {
  let component: CrudEventosComponent;
  let fixture: ComponentFixture<CrudEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
