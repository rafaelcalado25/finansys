import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export interface Categoria extends BaseResourceModel {
    id?: number,
    nome?: string,
    descricao?: string
}