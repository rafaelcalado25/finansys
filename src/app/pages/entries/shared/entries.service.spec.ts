import { EntriesService } from './entries.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from 'src/app/in-memory-database';
import { Entry } from './entries.dto';
import { Type } from './constante.config';
import { awaitStream } from 'src/app/shared/auxiliar/funcaoAuxiliartest';

describe('Lancamentos Services', () => {
  

    let lancamentoService : EntriesService = null;
    let lancamentoAntes: Entry = null;
    let lancamentoDepois: Entry = null;
    let funcaoAuxliarTest: any = null;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [  ],
        imports: [HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
          HttpClientModule,], 
        providers: [ EntriesService  ],
      })
      .compileComponents();
    });  

    

     beforeEach(() => {
      lancamentoService = TestBed.get(EntriesService);
      lancamentoAntes = {id:1, nome:'Gás de Cozinha', descricao:'gas', categoria:{}, 
      categoriaId:1, type:Type.expense, amount:'69,80', paid:true, date:'01/09/2020'};
      lancamentoDepois = null;
      funcaoAuxliarTest = awaitStream;
      jasmine.clock().install();
    
      }); 

      afterEach(() => {
        jasmine.clock().uninstall();
      });

    it('create an instance', () => {
         expect(lancamentoService).toBeTruthy();
      });

      //Validando o getResource()
    it('Deve retornar a quantidade de lançamentos que existe no banco de dados', () => {
      const data = funcaoAuxliarTest(lancamentoService.getResources(),1000);
      expect(data.length).toEqual(3);
     
    });
      //Validando o consulta por chave primaria
    it('Deve retornar o mesmo registro de lançamento depois ', () => {
      lancamentoDepois = funcaoAuxliarTest(lancamentoService.getById(lancamentoAntes.id),1000);
      expect(lancamentoDepois.id).toEqual(lancamentoAntes.id);
     
    });

      //Validando a atualização do registro
    it('Deve retornar registro diferente, pois houve alteração. ', () => {
      lancamentoDepois = Object.assign({}, lancamentoAntes);
      lancamentoDepois.amount = '4000';
      funcaoAuxliarTest(lancamentoService.atualizarResource(lancamentoDepois),1000);
      lancamentoDepois = funcaoAuxliarTest(lancamentoService.getById(lancamentoAntes.id),1000);
      expect(lancamentoDepois.amount).not.toEqual(lancamentoAntes.amount);
     
    });

      //Validando a inserção do registro
      it('Deve retornar 4 registro, tendo em vista que temos 3 na base de dados e 1 registro sendo inserido agora ', () => {
        lancamentoDepois = {id:null, nome:'Gás de Cozinha', descricao:'gas', categoria:{}, 
        categoriaId:1, type:Type.expense, amount:'69,80', paid:true, date:'01/09/2020'};
        lancamentoDepois.amount = '4000';
        funcaoAuxliarTest(lancamentoService.inserirResource(lancamentoDepois),1000);
        const data = funcaoAuxliarTest(lancamentoService.getResources(),1000);
        expect(data.length).toEqual(4);
       
      });

      //Validando o delete do registro
      it('Deve retornar 2 registro, tendo em vista que temos 3 na base de dados e 1 registro sendo deletado agora ', () => {
        funcaoAuxliarTest(lancamentoService.eliminarResource(2),1000);
        const data = funcaoAuxliarTest(lancamentoService.getResources(),1000);
        expect(data.length).toEqual(2);
       
      });
    
})