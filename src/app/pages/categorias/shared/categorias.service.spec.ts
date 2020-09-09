import { TestBed } from '@angular/core/testing';

import { CategoriasService } from './categorias.service';
import { Categoria } from './categoria.dto';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let categorias: Categoria[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
    
});
