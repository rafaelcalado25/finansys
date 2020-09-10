import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipe.module';


@NgModule({
  declarations: [CategoriaListaComponent, CategoriaFormComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,   
    PipeModule
  ],
  
})
export class CategoriasModule { }
