import {PageHeaderModal} from './components/page-header/page-header.component'

export const PAGE_HEADER_ITEMS: Map <string,PageHeaderModal> = new Map([
    [
        'FORM',
        {
            acao: '<< Voltar',
            id:'FORM',
            link:'',
            title: '',
        },
    ],
    [
        'LIST',
        {
            acao: '+ Novo ',
            id:'LISTA',
            link:'',
            title: '',
        },
    ]
]);
