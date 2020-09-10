import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria, CategoriasService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  currentActionEdit: boolean;
  categoriaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  subimmitingForm: boolean = false;
  categoria: Categoria = {};

  constructor(private categoriaService: CategoriasService,
    private formBuider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }



  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setcurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  submitForm(){
    this.subimmitingForm = true;
    if(this.currentActionEdit){
      this.atualizarCategoria();
    } else {
      this.criarCategoria();
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

  private buildCategoriaForm(): void{
    this.categoriaForm = this.formBuider.group({
      id: [null],
      nome:[null, [Validators.required, Validators.minLength(10)]],
      descricao: [null]
    });
  }

  private loadCategoria(): void {
    if(this.currentActionEdit){
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get('id')))
        ).subscribe(
          response =>{
            this.categoria = response;
            this.categoriaForm.patchValue(this.categoria);
          },
          error => {
            console.error('Erro no load categoria');
          }
        );
    }
  }

  private setPageTitle(){
    if(!this.currentActionEdit){
      this.pageTitle = 'Cadastro de nova categoria';
    } else {
      const categoriaNome = this.categoria.nome || "";
      this.pageTitle = 'Editar a categoria ' + categoriaNome;
    }
  }

  private atualizarCategoria(){
    const categoria : Categoria =({id:this.categoriaForm.value["id"],nome:this.categoriaForm.value["nome"],descricao:this.categoriaForm.value["descricao"]});
    this.categoriaService.atualizarCategoria(categoria).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
      },
      error => {
        toastr.error('Erro ao atualizar a categoria');
      }
    );
  }

  private criarCategoria() {
    const categoria : Categoria =({id:null,nome:this.categoriaForm.value["nome"],descricao:this.categoriaForm.value["descricao"]});
    this.categoriaService.inserirCategoria(categoria).subscribe(
      response => {
        this.operacaoRealizadaSucesso(response);
      },
      error => {

      }
    );

  }

  private operacaoRealizadaSucesso(categoria: Categoria){
    toastr.success('Operação realizada com sucesso!');
    this.router.navigateByUrl('categorias');
  }

}
