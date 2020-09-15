import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import { Observable } from 'rxjs';
import { Categoria } from './pages/categorias/shared/categoria.dto';
import { Entry } from './pages/entries/shared/entries.dto';
import { Type } from './pages/entries/shared/constante.config';



export class InMemoryDatabase implements InMemoryDbService{

    createDb(reqInfo?: RequestInfo) {
        const categorias: Categoria[] = [
            {id:1, nome:'Lazer', descricao:'Praia, Cinema, Shopping'},
            {id:2, nome:'Alimentação', descricao:'Mercado, Restaurante, Padaria'},
            {id:3, nome:'Locomoção', descricao:'Combustivel, Onibus, Mecanico, Seguro'},
            {id:4, nome:'Educação', descricao:'Escola, Integral, Material escolar'},
            {id:5, nome:'Moradia', descricao:'Financiamento, Condomínio, Energia'},
            {id:6, nome:'Entretenimento', descricao:'Internet, Netflix, Celular'},
            {id:7, nome:'Mantenimento', descricao:'Gás, Agua'},
            {id:8, nome:'Salário', descricao:'Remuneração, ticket'},
            {id:8, nome:'Renda', descricao:'Aluguel, Aplicações'},
        ];

        const entries: Entry[] = [
            {id:1, nome:'Gás de Cozinha', descricao:'gas', categoria:categorias[6], 
                categoriaId:categorias[6].id, type:Type.expense, amount:'69,80', paid:true, date:'01/09/2020'},
            {id:2, nome:'Salario na Empresa X', descricao:'faz-me rir', categoria:categorias[7], 
                categoriaId:categorias[7].id, type:Type.revenue, amount:'3000,80', paid:false, date:'15/09/2020'},
            {id:3, nome:'Aluguel', descricao:'Apartamento Ipojuca', categoria:categorias[8], 
                categoriaId:categorias[8].id, type:Type.revenue, amount:'969,80', paid:true, date:'01/09/2020'},
            {id:4, nome:'Escola de Raissa', descricao:'Santa Gertrudes', categoria:categorias[3], 
                categoriaId:categorias[3].id, type:Type.expense, amount:'696,80', paid:true, date:'08/09/2020'} ,
            {id:5, nome:'Integral Raissa', descricao:'Espaço Interativo', categoria:categorias[3], 
                categoriaId:categorias[3].id, type:Type.expense, amount:'450,80', paid:true, date:'08/09/2020'},
            {id:6, nome:'Internet', descricao:'Cianet', categoria:categorias[5], 
                categoriaId:categorias[5].id, type:Type.expense, amount:'100,00', paid:true, date:'04/09/2020'},
            {id:7, nome:'Condomínio', descricao:'Olinda', categoria:categorias[4], 
                categoriaId:categorias[4].id, type:Type.expense, amount:'500,00', paid:true, date:'03/08/2020'},
            {id:8, nome:'Condomínio', descricao:'Ipojuca', categoria:categorias[4], 
                categoriaId:categorias[4].id, type:Type.expense, amount:'170,80', paid:true, date:'07/08/2020'}                               
        ];
        return {categorias, entries};
        
    }

}