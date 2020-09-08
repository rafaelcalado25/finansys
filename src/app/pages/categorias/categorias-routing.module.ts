import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListaComponent } from './categoria-lista';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

export const routes: Routes = [
  {path:'', component: CategoriaListaComponent},
  {path:'listar', component: CategoriaListaComponent},
  {path:':id', component: CategoriaFormComponent},
  {path:':id/edit', component: CategoriaFormComponent},
  {path:'new', component: CategoriaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
