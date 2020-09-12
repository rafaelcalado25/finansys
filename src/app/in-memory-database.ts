import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import { Observable } from 'rxjs';
import { Categoria } from './pages/categorias/shared/categoria.dto';
import { Entry } from './pages/entries/shared/entries.dto';
import { Type } from './pages/entries/shared/constante.config';



export class InMemoryDatabase implements InMemoryDbService{

    createDb(reqInfo?: RequestInfo) {
        const categorias: Categoria[] = [
            {id:2, nome:'Lazer', descricao:'Praia, Cinema'},
            {id:1, nome:'Negocios', descricao:'Reunião, Escritório'},
        ];

        const entries: Entry[] = [
            {id:1, nome:'Gás de Cozinha', descricao:'gas', categoria:categorias[0], 
                categoriaId:categorias[0].id, type:Type.expense, amount:'69,80', paid:true, date:'01/09/2020'},
            {id:2, nome:'Salario na Empresa X', descricao:'faz-me rir', categoria:categorias[1], 
                categoriaId:categorias[1].id, type:Type.revenue, amount:'6969,80', paid:false, date:'01/09/2020'},
            {id:3, nome:'Aluguel', descricao:'Apartamento Ipojuca', categoria:categorias[1], 
                categoriaId:categorias[1].id, type:Type.revenue, amount:'969,80', paid:true, date:'01/09/2020'}               
        ];
        return {categorias, entries};
        
    }

}