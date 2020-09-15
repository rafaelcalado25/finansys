import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from './pipes/pipe.module';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
//import { awaitStream } from './auxiliar/funcaoAuxiliartest'



@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,      
    PipeModule,    
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,      
    PipeModule,   
    BreadCrumbComponent, PageHeaderComponent,
    RouterModule , 
  ]
})
export class SharedModule { }
