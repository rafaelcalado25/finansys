import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListaComponent } from './entry-lista';

const routes: Routes = [
  {path:'', component:EntryListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
