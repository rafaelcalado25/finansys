import { Component, OnInit } from '@angular/core';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('REPORT');
  constructor() {

    this.itemHeader.acao = this.itemHeader.acao;
    this.itemHeader.link = '';
    this.itemHeader.title = 'RELATÓRIOS';
   }

  ngOnInit(): void {
  }

}
