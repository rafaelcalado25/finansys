 import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {

  let clienteIdPipe:SortPipe;
  let entradasCategorias = null;
  
    beforeEach(() => {
        clienteIdPipe = new SortPipe();
        entradasCategorias = [
          {id:2, nome:'Lazer', descricao:'Praia, Cinema'},
          {id:1, nome:'Negocios', descricao:'Reunião, Escritório'},
      ];
      
    });

  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('Deve retornar 2 itens', () => {    
    expect(clienteIdPipe.transform(entradasCategorias,'id').length).toEqual(2);
  });

  it('Deve retornar a categoria de ID 1 na primeira posição do Array, para o primeiro teste e ID 2 no segundo teste', () => {    
    expect(clienteIdPipe.transform(entradasCategorias,'id')[0].id).toEqual(1);
    expect(clienteIdPipe.transform(entradasCategorias,'nome')[0].id).toEqual(2);
  });

  it('Deve retornar a categoria de ID 2 na primeira posição do Array', () => {    
    expect(clienteIdPipe.transform(entradasCategorias,'title')[0].id).toEqual(2);
  });
  
});
 