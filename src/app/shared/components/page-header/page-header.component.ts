import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbItem } from '../bread-crumb/bread-crumb.component';
import { PAGE_HEADER_ITEMS } from '../../constantes.config';

export interface PageHeaderModal {
  id: 'LISTA' | 'FORM' | 'REPORT',
  title: string,
  acao: string,
  link: string,
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() breadCrumbItems: BreadCrumbItem [] = [];
  @Input() pageHeaderModal : PageHeaderModal;
  
  constructor() { }

  ngOnInit(): void {
  }

}
