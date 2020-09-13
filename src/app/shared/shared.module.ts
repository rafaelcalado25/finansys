import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from './pipes/pipe.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,      
    PipeModule,    
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,      
    PipeModule,   
  ]
})
export class SharedModule { }
