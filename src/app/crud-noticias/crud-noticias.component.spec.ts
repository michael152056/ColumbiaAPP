import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNoticiasComponent } from './crud-noticias.component';

describe('CrudNoticiasComponent', () => {
  let component: CrudNoticiasComponent;
  let fixture: ComponentFixture<CrudNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
