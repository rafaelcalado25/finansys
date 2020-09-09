import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListaComponent } from './categoria-lista.component';
import { HttpClientModule } from '@angular/common/http';

describe('CategoriaListaComponent', () => {
  let component: CategoriaListaComponent;
  let fixture: ComponentFixture<CategoriaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CategoriaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('teste', () => {
    expect(component.consultarCategorias().length).toEqual(0);
  })
});
