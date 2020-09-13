import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDatabase} from '../in-memory-database';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    CommonModule,HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    HttpClientModule,
  ],
  exports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
