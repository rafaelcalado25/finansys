import { Component, Injector } from '@angular/core';
import {  Validators } from '@angular/forms';
import { Entry, EntriesService } from '../shared';
import { Type } from '../shared/constante.config';
import { CategoriasService, Categoria } from '../../categorias/shared';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource/base-resource-form.component';
import { PageHeaderModal } from 'src/app/shared/components/page-header/page-header.component';
import { PAGE_HEADER_ITEMS } from 'src/app/shared/constantes.config';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> {
  
  entryType = [[]];
  categorias: Categoria[] = [];

  itemHeader: PageHeaderModal = PAGE_HEADER_ITEMS.get('FORM');
  
  constructor(protected entryService: EntriesService,
    protected categoriasService: CategoriasService,
    protected injector: Injector
    ) { 
      super(entryService, injector, {});
      this.entryType = Object.entries(Type);
      this.categoriasService.getResources().subscribe(
        response => {
          this.categorias = response;          
        },
        error => {

        }
      ); 
    }

    protected resourceFromEntryForm(): Entry {
      let type: Type;
      if(Type.revenue == this.resourceForm.value["tipo"]){
        type = Type.revenue;
      }else{
        type = Type.expense;
      }
      const entry : Entry =({id:this.resourceForm.value["id"],nome:this.resourceForm.value["nome"],
      descricao:this.resourceForm.value["descricao"], type:type,
      amount:this.resourceForm.value["amount"], date:this.resourceForm.value["date"],
      paid:this.resourceForm.value["paid"], categoriaId:this.resourceForm.value["categoriaId"],
      });

      return entry;
    }
    protected buildResourceForm(): void {
      this.resourceForm = this.formBuider.group({
        id: [null],
        nome:[null, [Validators.required, Validators.minLength(2)]],
        descricao: [null],
        tipo: ['expense',  [Validators.required]],
        amount: [null,  [Validators.required]],
        date: [null,  [Validators.required]],
        paid: [true,  [Validators.required]],
        categoriaId: [null,  [Validators.required]],
      });
    }

    onBlur(event){
      let amount:string = this.resourceForm.value["amount"];
      let i = amount.indexOf('.');
      if(i < 0){
        this.resourceForm.get("amount").setValue(amount + ',00');
      }else {
        if(amount.substr(i+1,amount.length).length<2){
          let x = amount.substr(i+1,amount.length);
          x = x.padEnd(2,'0');
          this.resourceForm.get("amount").setValue(amount.substr(0,i) +','+ x);
        }
      }
    }

    protected criarResource(){
      let entry : Entry =this.resourceFromEntryForm();
      this.categoriasService.getById(entry.categoriaId).subscribe(
        response =>{
          entry.categoria = response;
          this.baseResourceService.inserirResource(entry).subscribe(
            response => {
              entry = response;
              this.operacaoRealizadaSucesso(entry);
            },
            error => {

            }
          );
        } ,
        error =>{

        }
      );
    }

    protected atualizarResource(){
      let entry : Entry =this.resourceFromEntryForm();
      this.categoriasService.getById(entry.categoriaId).subscribe(
        response =>{
          entry.categoria = response;
          this.baseResourceService.atualizarResource(entry).subscribe(
            response => {
              entry = response;
              this.operacaoRealizadaSucesso(entry);
            },
            error => {

            }
          );
        } ,
        error =>{

        }
      );
    } 
     getItemHeader(){
      this.itemHeader.acao = this.itemHeader.acao;
      this.itemHeader.link = '/entries';
      this.itemHeader.title = 'Lançamento ' +
              (this.baseResourceModel && this.baseResourceModel.nome? ' - '+ this.baseResourceModel.nome: '');
      this.entryType = Object.entries(Type);
      return this.itemHeader;

    }
}
