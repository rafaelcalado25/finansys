import { Categoria } from '../../categorias/shared/categoria.dto';
import { Type } from './constante.config';

export interface Entry {
    id?: number,
    nome?: string,
    descricao?: string,
    type?: Type,
    amount?: string,
    date?: string,
    paid?: boolean,
    categoriaId?: number,
    categoria?: Categoria,
}