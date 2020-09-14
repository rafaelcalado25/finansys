import { Component } from '@angular/core';
import { CategoriasService } from '../shared/categorias.service';
import { Categoria } from '../shared/categoria.dto';
import { BaseResourceListaComponent } from 'src/app/shared/components/base-resource/base-resource-lista.component';
import { BreadCrumbItem } from 'src/app/shared/components/bread-crumb/bread-crumb.component';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';


@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css'],
  
})
export class CategoriaListaComponent extends BaseResourceListaComponent<Categoria>{
  
  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('LIST');

  constructor(protected categoriasServices: CategoriasService) {
    super(categoriasServices);   
    this.itemHeader.acao = this.itemHeader.acao + ' Categoria';
    this.itemHeader.link = 'new';
    this.itemHeader.title = 'Categorias';
   } 

}
