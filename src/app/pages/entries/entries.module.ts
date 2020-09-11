import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipe.module';


@NgModule({
  declarations: [EntryListaComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,      
    PipeModule
  ]
})
export class EntriesModule { }
