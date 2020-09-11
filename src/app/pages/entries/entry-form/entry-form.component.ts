import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entry, EntriesService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

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

  constructor(private entryService: EntriesService,
    private formBuider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }



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
      type: [null,  [Validators.required]],
      amount: [null,  [Validators.required]],
      date: [null,  [Validators.required]],
      paid: [null,  [Validators.required]],
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

  private atualizarEntry(){
    const entry : Entry =({id:this.entryForm.value["id"],nome:this.entryForm.value["nome"],descricao:this.entryForm.value["descricao"]});
    this.entryService.atualizarEntry(entry).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
      },
      error => {
        toastr.error('Erro ao atualizar a entry');
      }
    );
  }

  private criarEntry() {
    const entry : Entry =({id:null,nome:this.entryForm.value["nome"],descricao:this.entryForm.value["descricao"]});
    this.entryService.inserirEntry(entry).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
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
