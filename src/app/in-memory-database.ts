import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import { Observable } from 'rxjs';
import { Categoria } from './pages/categorias/shared/categoria.dto';



export class InMemoryDatabase implements InMemoryDbService{

    createDb(reqInfo?: RequestInfo) {
        const categorias = [
            {id:1, nome:'Lazer', descricao:'Praia, Cinema'},
            {id:2, nome:'Negocios', descricao:'Reunião, Escritório'},
        ];
        return {categorias};
        
    }

}