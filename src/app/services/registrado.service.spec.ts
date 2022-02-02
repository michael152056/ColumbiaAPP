import { TestBed } from '@angular/core/testing';

import { RegistradoService } from './registrado.service';

describe('RegistradoService', () => {
  let service: RegistradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
