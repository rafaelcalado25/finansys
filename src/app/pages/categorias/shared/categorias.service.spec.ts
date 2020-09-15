import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from 'src/app/in-memory-database';
import { awaitStream } from 'src/app/shared/auxiliar/funcaoAuxiliartest';
import { CategoriasService, Categoria } from '.';

describe('Categorias Services', () => {
  

    let categoriasService : CategoriasService = null;
    let categoriaAntes: Categoria = null;
    let categoriaDepois: Categoria = null;
    let funcaoAuxliarTest: any = null;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [  ],
        imports: [HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
          HttpClientModule,], 
        providers: [ CategoriasService  ],
      })
      .compileComponents();
    });  

    

     beforeEach(() => {
      categoriasService = TestBed.get(CategoriasService);
      categoriaAntes = {id:2, nome:'Lazer', descricao:'Praia, Cinema'};
      categoriaDepois = null;
      funcaoAuxliarTest = awaitStream;
      jasmine.clock().install();
    
      }); 

      afterEach(() => {
        jasmine.clock().uninstall();
      });

    it('create an instance', () => {
         expect(categoriasService).toBeTruthy();
      });

      //Validando o getResource()
    it('Deve retornar a quantidade de categorias que existe no banco de dados', () => {
      const data = funcaoAuxliarTest(categoriasService.getResources(),1000);
      expect(data.length).toEqual(2);
     
    });
      //Validando o consulta por chave primaria
    it('Deve retornar o mesmo registro de categorias depois ', () => {
      categoriaDepois = funcaoAuxliarTest(categoriasService.getById(categoriaAntes.id),1000);
      expect(categoriaDepois.id).toEqual(categoriaAntes.id);
     
    });

      //Validando a atualização do registro
    it('Deve retornar registro diferente, pois houve alteração. ', () => {
      categoriaDepois = Object.assign({}, categoriaAntes);
      categoriaDepois.descricao = 'Praia, Cinema, Futebol';
      funcaoAuxliarTest(categoriasService.atualizarResource(categoriaDepois),1000);
      categoriaDepois = funcaoAuxliarTest(categoriasService.getById(categoriaAntes.id),1000);
      expect(categoriaDepois.descricao).not.toEqual(categoriaAntes.descricao);
     
    });

      //Validando a inserção do registro
      it('Deve retornar 4 registro, tendo em vista que temos 3 na base de dados e 1 registro sendo inserido agora ', () => {
        categoriaDepois = {id:null, nome:'Lazer', descricao:'Praia, Cinema'};
        categoriaDepois.descricao = 'Praia, Cinema, Futebol';
        funcaoAuxliarTest(categoriasService.inserirResource(categoriaDepois),1000);
        const data = funcaoAuxliarTest(categoriasService.getResources(),1000);
        expect(data.length).toEqual(3);
       
      });

      //Validando o delete do registro
      it('Deve retornar 2 registro, tendo em vista que temos 3 na base de dados e 1 registro sendo deletado agora ', () => {
        funcaoAuxliarTest(categoriasService.eliminarResource(2),1000);
        const data = funcaoAuxliarTest(categoriasService.getResources(),1000);
        expect(data.length).toEqual(1);
       
      });
    
})