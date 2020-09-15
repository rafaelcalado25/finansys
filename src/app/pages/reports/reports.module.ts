import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule, ChartModule,
  ],
  providers: [    
  ]
})
export class ReportsModule { }
