import {  OnInit, Directive } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';


@Directive()

export class BaseResourceListaComponent <T extends BaseResourceModel> implements OnInit {

  resources : T [] = [] ;

  constructor(protected baseResourceService: BaseResourceService<T>) {
    this.baseResourceService.getResources().subscribe(
      response => {
        this.resources = response;
      }
    );
   }

  ngOnInit(): void {
  }

  deletar(resource: T){
    const mustDelete = confirm('Vai querer arroxar o nó mesmo?');
    if(mustDelete){
      this.baseResourceService.eliminarResource(resource.id).subscribe(()=>{
        this.resources = this.resources.filter(r => {
          if(r.id != resource.id){
            return r;
          }
        });
      },
      error => {
        console.error('teste');
      });
    }else {
      console.log('voce é um cagão');
    }
    
  }

}
