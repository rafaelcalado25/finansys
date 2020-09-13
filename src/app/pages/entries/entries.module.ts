import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListaComponent } from './entry-lista';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {CalendarModule } from 'primeng/calendar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';



const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [EntryListaComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    NgxMaskModule.forRoot(maskConfig),    
    
  ]
})
export class EntriesModule { }
