import { NgModule } from '@angular/core';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [CategoriaListaComponent, CategoriaFormComponent],
  imports: [
    SharedModule,
    CategoriasRoutingModule,
    
  ],
  
})
export class CategoriasModule { }
