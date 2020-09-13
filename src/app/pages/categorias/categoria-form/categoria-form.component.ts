import { Component, Injector } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Categoria, CategoriasService } from '../shared';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends BaseResourceFormComponent<Categoria> {
 
  categoria: Categoria = {};

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
}
