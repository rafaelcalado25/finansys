import { Component, Injector } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Categoria, CategoriasService } from '../shared';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource/base-resource-form.component';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends BaseResourceFormComponent<Categoria> {
 
  //categoria: Categoria = {};

  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('FORM');

  constructor(protected categoriaService: CategoriasService,
    protected injetor: Injector
    ) { 
      super(categoriaService, injetor, {});
      
    }

    protected resourceFromEntryForm(): Categoria {
      
      const categoria : Categoria =({id:this.resourceForm.value["id"],nome:this.resourceForm.value["nome"],
      descricao:this.resourceForm.value["descricao"]
      });
      return categoria;
    }
    
    protected buildResourceForm(): void {
      this.resourceForm = this.formBuider.group({
        id: [null],
        nome:[null, [Validators.required, Validators.minLength(2)]],
        descricao: [null]
      });
    }

    getItemHeader(){
      this.itemHeader.acao = this.itemHeader.acao;
      this.itemHeader.link = '/categorias';
      this.itemHeader.title = 'Categoria ' +
              (this.baseResourceModel && this.baseResourceModel.nome? ' - '+ this.baseResourceModel.nome: '');
      
      return this.itemHeader;

    }
}
