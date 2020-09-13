import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListaComponent } from './categoria-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CategoriaListaComponent', () => {
  let component: CategoriaListaComponent;
  let fixture: ComponentFixture<CategoriaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
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
  
});
