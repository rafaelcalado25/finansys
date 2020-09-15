import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module')
      .then(m => m.CategoriasModule),
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries.module')
      .then(m => m.EntriesModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module')
      .then(m => m.ReportsModule),
  },
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: '**', redirectTo: 'reports' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
