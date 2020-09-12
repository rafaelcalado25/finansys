import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entry, EntriesService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Type } from '../shared/constante.config';
import { CategoriasService, Categoria } from '../../categorias/shared';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  currentActionEdit: boolean;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  subimmitingForm: boolean = false;
  entry: Entry = {};
  entryType = [[]];

  categorias: Categoria[] = [];
  
  constructor(private entryService: EntriesService,
    private formBuider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriasService: CategoriasService,
    ) { 
      this.entryType = Object.entries(Type);
      this.categoriasService.getCategorias().subscribe(
        response => {
          this.categorias = response;
          console.log(this.categorias);
        },
        error => {

        }
      );
    }



  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setcurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }


  submitForm(){
    this.subimmitingForm = true;
    if(this.currentActionEdit){
      this.atualizarEntry();
    } else {
      this.criarEntry();
    }     
  }

  onBlur(event){
    let amount:string = this.entryForm.value["amount"];
    let i = amount.indexOf('.');
    if(i < 0){
      this.entryForm.get("amount").setValue(amount + ',00');
    }else {
      if(amount.substr(i+1,amount.length).length<2){
        let x = amount.substr(i+1,amount.length);
        x = x.padEnd(2,'0');
        this.entryForm.get("amount").setValue(amount.substr(0,i) +','+ x);
      }
    }
  }
  // PRIVATES METHODS

  private setcurrentAction(): void {
    if(this.route.snapshot.url[0].path == 'new'){
      this.currentAction = 'Novo';
      this.currentActionEdit = false;
    } else {
      this.currentAction = 'Editar';
      this.currentActionEdit = true;
    }
  }

  private buildEntryForm(): void{
    this.entryForm = this.formBuider.group({
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

  private loadEntry(): void {
    if(this.currentActionEdit){
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
        ).subscribe(
          response =>{
            console.log(response);
            this.entry = response;
            this.entryForm.patchValue(this.entry);
            let type: Type;
            if(Type.revenue == this.entry.type ){
              this.entryForm.get('tipo').setValue('revenue');
            }else{
              this.entryForm.get('tipo').setValue('expense');
            }           
          },
          error => {
            console.error('Erro no load entry');
          }
        );
    }
  }

  private setPageTitle(){
    if(!this.currentActionEdit){
      this.pageTitle = 'Cadastro de nova entry';
    } else {
      const entryNome = this.entry.nome || "";
      this.pageTitle = 'Editar a entry ' + entryNome;
    }
  }

  private atualizarEntry():Subscription{
    // SE eu quiser tipar o tipo de retorno dessa função eu teria que utilizar o flatmap (mergemap) ou 
    //switchmap. isso porque estes dois metodos resolvem um observable deixando apenas um observable
    //para ser retornado. Do jeito que esta aqui a função retorna uma Subscrição
    let type: Type;
    if(Type.revenue == this.entryForm.value["tipo"]){
      type = Type.revenue;
    }else{
      type = Type.expense;
    }
    const entry : Entry =({id:this.entryForm.value["id"],nome:this.entryForm.value["nome"],
      descricao:this.entryForm.value["descricao"], type:type,
      amount:this.entryForm.value["amount"], date:this.entryForm.value["date"],
      paid:this.entryForm.value["paid"], categoriaId:this.entryForm.value["categoriaId"],
    });
    return this.categoriasService.getById(entry.categoriaId).subscribe(
      response => {
        entry.categoria = response;
        return this.entryService.atualizarEntry(entry).subscribe(
          response => {
            this.operacaoRealizadaSucesso(response);
          },
          error => {
            toastr.error('Erro ao atualizar a entry');
          }
        );

      },
      error => {

      }
    );
    
  }

  private criarEntry() {

    let type: Type;
    if(Type.revenue == this.entryForm.value["tipo"]){
      type = Type.revenue;
    }else{
      type = Type.expense;
    }

    const entry : Entry =({id:this.entryForm.value["id"],nome:this.entryForm.value["nome"],
    descricao:this.entryForm.value["descricao"], type:type,
    amount:this.entryForm.value["amount"], date:this.entryForm.value["date"],
    paid:this.entryForm.value["paid"], categoriaId:this.entryForm.value["categoriaId"],
    });
    console.log(entry);
    entry.date = entry.date.substr(0,10);
    this.categoriasService.getById(entry.categoriaId).subscribe(
      response => {
        entry.categoria = response;
        this.entryService.inserirEntry(entry).subscribe(
          response => {
            this.operacaoRealizadaSucesso(response);
          },
          error => {
            toastr.error('Erro ao criar a entry');
          }
        );

      },
      error => {

      }
    );

  }

  private operacaoRealizadaSucesso(entry: Entry){
    toastr.success('Operação realizada com sucesso!');
    this.router.navigateByUrl('entries');
  }

}
