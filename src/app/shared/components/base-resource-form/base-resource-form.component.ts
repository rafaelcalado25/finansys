import {  OnInit, AfterContentChecked, Injector,  Directive } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';


@Directive()

export abstract class BaseResourceFormComponent <T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  currentActionEdit: boolean;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  subimmitingForm: boolean = false;
  
  protected formBuider: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;

  constructor(protected baseResourceService: BaseResourceService<T>,    
    protected injector: Injector, public baseResourceModel: T
    ) { 
        this.formBuider = this.injector.get(FormBuilder);
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
    }


  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setcurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  submitForm(){
    this.subimmitingForm = true;
    if(this.currentActionEdit){
      this.atualizarResource();
    } else {
      this.criarResource();
    }
  }

  // PROTECTED METHODS

  protected setcurrentAction(): void {
    if(this.route.snapshot.url[0].path == 'new'){
      this.currentAction = 'Novo';
      this.currentActionEdit = false;
    } else {
      this.currentAction = 'Editar';
      this.currentActionEdit = true;
    }
  }

  protected loadResource(): void {
    if(this.currentActionEdit){
      this.route.paramMap.pipe(
        switchMap(params => this.baseResourceService.getById(+params.get('id')))
        ).subscribe(
          response =>{
            this.baseResourceModel = response;
            this.resourceForm.patchValue(this.baseResourceModel);
          },
          error => {
            console.error('Erro no load categoria');
          }
        );
    }
  }

  protected setPageTitle(){
    if(!this.currentActionEdit){
      this.pageTitle = this.criationPageTitle();
    } else {
      this.pageTitle = this.updatedPageTitle();
    }
  }

  protected criationPageTitle(): string{
    return 'Novo';
  }

  protected updatedPageTitle(): string{
      return 'Edição';
  }

  protected atualizarResource(){
    const resource : T =this.resourceFromEntryForm();
    this.baseResourceService.atualizarResource(resource).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
      },
      error => {
        toastr.error('Erro ao atualizar a categoria');
      }
    );
  }

  protected criarResource() {
    const resource : T = this.resourceFromEntryForm();
    this.baseResourceService.inserirResource(resource).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
      },
      error => {
        toastr.error('Erro ao tentar criar o Recurso');
        
      }
    );

  }

  protected operacaoRealizadaSucesso(resource: T){
    toastr.success('Operação realizada com sucesso!');
    this.router.navigateByUrl(this.route.snapshot.parent.url[0].path);
  }

  protected abstract resourceFromEntryForm(): T;
  protected abstract buildResourceForm(): void;

}
