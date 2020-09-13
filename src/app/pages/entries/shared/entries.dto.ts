import { Categoria } from '../../categorias/shared/categoria.dto';
import { Type } from './constante.config';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export interface Entry extends BaseResourceModel {
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