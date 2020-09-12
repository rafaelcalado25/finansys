import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipe.module';
import {CalendarModule } from 'primeng/calendar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [EntryListaComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,      
    PipeModule,
    CalendarModule,
    NgxMaskModule.forRoot(maskConfig),
    //BrowserAnimationsModule,
  ]
})
export class EntriesModule { }
